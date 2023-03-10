import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import Chat from '../../../models/Chat'
import Message from '../../../models/Message'
import verifyToken from '../../../lib/server/verifyToken'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            verifyToken(req, res, createChat)
            break
        case 'GET':
            verifyToken(req, res, getChats)
            break
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function createChat(req, res) {
    try {
        const userId = req.user.id
        const { users } = req.body

        if (!users || users.length === 0) {
            return res.status(200).json({ error: { message: 'Users are required' } })
        }

        const currentUser = await User.findById(userId)
        if (!currentUser) {
            return res.status(200).json({ error: { message: 'Current user not found' } })
        }

        // check if users exist
        const usersExist = await User.find({ _id: { $in: users } })
        if (usersExist.length !== users.length) {
            return res.status(200).json({ error: { message: 'Some users not found' } })
        }

        // check if chat already exists
        const chatExists = await Chat.findOne({
            users: {
                $all: [userId, ...users]
            }
        })

        if (chatExists) {
            return res.status(200).json({
                error: null,
                chat: {
                    id: chatExists._id,
                    users: chatExists.users,
                },
                message: 'Chat already exists'
            })
        }

        // create new chat
        const chat = new Chat({
            users: [userId, ...users],
            is_group_chat: users.length > 1,
        })

        await chat.save()

        res.status(201).json({
            error: null,
            chat: {
                id: chat._id,
                users: chat.users,
            },
            message: 'Chat created successfully'
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }
}

async function getChats(req, res) {
    try {
        const userId = req.user.id
        // Search for chats where the user is included in the users array
        const chats = await Chat.find({ users: userId }).populate('last_message', 'text createdAt')
            .populate('users', 'username tag profile_picture email')

        res.status(200).json({
            error: null,
            chats: chats.map(chat => ({
                id: chat._id,
                users: chat.users.filter(user => user._id.toString() !== userId),
                last_message: chat.last_message,
                name: chat.name,
                is_group_chat: chat.is_group_chat,
            }))
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }
}