import dbConnect from "../../../../lib/dbConnect"
import verifyToken from "../../../../lib/server/verifyToken"
import Chat from "../../../../models/Chat"
import Message from "../../../../models/Message"

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
        const chatId = req.query.chatId

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


        // Update the messages seen by the user
        // get all the messages that the user has not seen
        const messages = await Message.find({
            chat: chatId,
            seen: { $nin: [userId] }
        })

        // update the messages seen by the user, foreach
        messages.forEach(async message => {
            message.seen.push(userId)
            await message.save()
        })

        await chat.populate('users', ['_id', 'username', 'email', 'profile_picture', 'tag'])
        await chat.populate('messages', ['_id', 'sender', 'text', 'seen', 'createdAt'])
        await chat.populate('messages.sender', ['_id', 'username', 'profile_picture', 'tag'])
        await chat.populate('messages.seen', ['_id', 'username', 'profile_picture', 'tag'])

        return res.status(200).json({
            error: null,
            chat: {
                id: chat._id,
                users: chat.users.filter(user => user._id.toString() !== userId),
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
    try {
        const chatId = req.query.chatId

        if (!chatId) {
            return res.status(200).json({ error: { message: 'Chat id is required' } })
        }

        // delete all the 

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }
}