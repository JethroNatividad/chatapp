import dbConnect from "../../../../lib/dbConnect"
import verifyToken from "../../../../lib/server/verifyToken"
import Chat from "../../../../models/Chat"

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'PUT':
            return verifyToken(req, res, updateChat)
        case 'GET':
            return verifyToken(req, res, getChat)
        case 'DELETE':
            return verifyToken(req, res, deleteChat)
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function getChat(req, res) {
    try {
        const userId = req.user.id
        const chatId = req.query.id

        if (!chatId) {
            return res.status(200).json({ error: { message: 'Chat id is required' } })
        }

        const chat = await Chat.findById(chatId)
        if (!chat) {
            return res.status(200).json({ error: { message: 'Chat not found' } })
        }

        const isUserInChat = chat.users.find(user => user.toString() === userId)

        if (!isUserInChat) {
            return res.status(200).json({ error: { message: 'User not in chat' } })
        }

        return res.status(200).json({
            error: null,
            chat: {
                id: chat._id,
                users: chat.users,
                messages: chat.messages,
            },
            message: 'Chat found'
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }

}

async function deleteChat(req, res) {

}