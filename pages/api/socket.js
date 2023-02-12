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
                    socket.authenticated = true
                })

                socket.on('send-message', data => {
                    const { userIds, message } = JSON.parse(data)
                    // get all users in chat that are in the userIdToSocketId map
                    const users = userIds.filter(user => userIdToSocketId.has(user.toString()))

                    console.log('users', users)


                    // emit the message to all users in the chat
                    users.forEach(user => {
                        const socketId = userIdToSocketId.get(user)
                        if (socketId) {
                            const userSocket = connections.get(socketId)
                            // io.to(socketId).emit('receive-message', JSON.stringify(message))
                            if (userSocket && userSocket.authenticated) {
                                console.log('emitting message to', user, socketId)
                                userSocket.emit('receive-message', JSON.stringify(message))
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