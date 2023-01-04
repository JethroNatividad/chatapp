import dbConnect from "../../../lib/dbConnect"
import verifyToken from "../../../lib/server/verifyToken"
import User from '../../../models/User'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            return verifyToken(req, res, getUsers)
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function getUsers(req, res) {
    try {
        const userId = req.user.id
        const { search } = req.query

        if (search) {

            const tag = search.split('#')[1]
            if (tag) {
                // if tag is included in search
                const username = search.split('#')[0]
                const users = await User.find({
                    _id: { $ne: userId },
                    $and: [
                        { username: { $regex: username, $options: 'i' } },
                        { tag: { $regex: tag, $options: 'i' } }
                    ]
                }).select('username email tag')

                return res.status(200).json({
                    error: null,
                    users
                })
            }

            const users = await User.find({
                _id: { $ne: userId },
                $and: [
                    { username: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ]
            }).select('username email tag')

            return res.status(200).json({
                error: null,
                users
            })
        }
        const users = await User.find({
            _id: { $ne: userId }
        }).select('username email tag')

        return res.status(200).json({
            error: null,
            users
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: { message: 'Internal server error' } })
    }
}