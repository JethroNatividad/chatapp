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
            const io = new Server(res.socket.server)
            res.socket.server.io = io

            // const connections = new Map()
            // const userIdToSocketId = new Map()

            io.on('connection', socket => {
                console.log(`User connected: ${socket.id}`)
                // connections.set(socket.id, socket)

                socket.on('authenticate', payload => {
                    const { userId, chatListIds } = JSON.parse(payload)
                    chatListIds.forEach(chatId => {
                        socket.join(chatId)
                    })
                    console.log(`User authenticated: ${userId}`)

                    socket.authenticated = true
                })

                socket.on('send-message', payload => {
                    const { chatId, message } = JSON.parse(payload)

                    // emit the message to all users in the chat
                    io.to(chatId).emit('receive-message', JSON.stringify(message))
                })

                socket.on('disconnect', () => {
                    console.log('Disconnected')
                })

            })

        } catch (error) {
            console.error(error)
        }
    }
    res.end()
}

export default SocketHandler