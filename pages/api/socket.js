import { Server } from 'Socket.IO'
import dbConnect from '../../lib/dbConnect'
import Chat from '../../models/Chat'
import Message from '../../models/Message'

const SocketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        try {
            console.log('Socket is initializing')
            await dbConnect()
            const io = new Server(res.socket.server)
            res.socket.server.io = io

            const connections = new Map()
            const userIdToSocketId = new Map()

            io.on('connection', socket => {
                console.log(`User connected: ${socket.id}`)
                connections.set(socket.id, socket)

                socket.on('authenticate', userId => {
                    userIdToSocketId.set(userId, socket.id)
                    console.log(`User authenticated: ${userId}`)
                })

                socket.on('send-message', async data => {
                    const { chatId, text } = JSON.parse(data)
                    console.log(chatId, text)
                    const chat = await Chat.findById(chatId)
                    if (!chat) return console.log('Chat not found')

                    // get all users in chat that are in the userIdToSocketId map
                    const users = chat.users.filter(user => userIdToSocketId.has(user.toString()))
                    // save the message to the database
                    const sender = userIdToSocketId.get(socket.id)
                    const message = await Message.create({
                        chat: chatId,
                        sender,
                        text,
                        seen: [sender]
                    })

                    await chat.populate('messages', ['_id', 'sender', 'text', 'seen', 'createdAt'])
                    await chat.populate('messages.sender', ['_id', 'username', 'profile_picture', 'tag'])
                    await chat.populate('messages.seen', ['_id', 'username', 'profile_picture', 'tag'])
                    // emit the message to all users in the chat
                    users.forEach(user => {
                        const socketId = userIdToSocketId.get(user.toString())
                        if (socketId) {
                            const socket = connections.get(socketId)
                            if (socket) {
                                socket.emit('receive-message', message)
                            }
                        }
                    })
                })

                socket.on('disconnect', () => {
                    console.log('Disconnected')
                    connections.delete(socket.id)
                })

            })

        } catch (error) {
            console.error(error)
        }
    }
    res.end()
}

export default SocketHandler