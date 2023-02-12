import dbConnect from "../../../lib/dbConnect"
import verifyToken from "../../../lib/server/verifyToken"
import Chat from "../../../models/Chat"
import User from "../../../models/User"

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            verifyToken(req, res, me)
            break
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function me(req, res) {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(200).json({ error: { message: 'User not found' } })
        }
        const chats = await Chat.find({ users: req.user.id })
        return res.status(200).json({
            error: null,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                chats: chats.map(chat => chat._id)
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: { message: 'Internal server error' } })
    }
}

