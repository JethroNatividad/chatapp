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

            io.on('connection', async socket => {
                const chatIds = JSON.parse(socket.handshake.query.chatIds)
                chatIds.forEach(chatId => {
                    socket.join(chatId)
                })

                console.log(`User connected: ${socket.id}`)
                console.log("q", socket.handshake.query.chatIds)
                console.log("Chat joined: ", JSON.parse(socket.handshake.query.chatIds))
                // connections.set(socket.id, socket)

                socket.on('initialize', payload => {
                    const { chatIds } = JSON.parse(payload)
                    console.log(chatIds)

                    // chatIds.forEach(chatId => {
                    //     socket.join(chatId)
                    // })
                    // console.log(`User authenticated: ${userId}`)

                    // socket.authenticated = true
                })

                socket.on('send-message', payload => {
                    const { chatId, message } = JSON.parse(payload)
                    console.log("SEND MESSAGE", chatId, message)

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