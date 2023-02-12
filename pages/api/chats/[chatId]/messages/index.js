import dbConnect from "../../../../../lib/dbConnect"
import verifyToken from "../../../../../lib/server/verifyToken"
import Chat from "../../../../../models/Chat"
import Message from "../../../../../models/Message"


export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            verifyToken(req, res, sendMessage)
            break
        case 'GET':
            verifyToken(req, res, getMessages)
            break
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

async function sendMessage(req, res) {
    try {
        const userId = req.user.id
        const chatId = req.query.chatId

        const { text, attachments } = req.body

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


        const message = new Message({
            chat: chatId,
            sender: userId,
            text,
            attachments,
            seen: [userId]
        })


        await message.save()

        await message.populate('sender', ['_id', 'username', 'profile_picture', 'tag'])
        await message.populate('seen', ['_id', 'username', 'profile_picture', 'tag'])

        console.log(text)

        chat.messages.push(message._id)
        chat.last_message = message._id
        await chat.save()

        return res.status(200).json({
            error: null,
            message: 'Message sent',
            data: message
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: error } })
    }
}

async function getMessages(req, res) {
    try {


    } catch (error) {
        console.error(error)
        res.status(500).json({ error: { message: 'Internal server error' } })
    }
}