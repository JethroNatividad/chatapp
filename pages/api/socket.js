import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        const connections = new Map()

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                socket.broadcast.emit('update-input', msg)
            })

            socket.on('message', message => {
                const { type, payload } = JSON.parse(message)

                if (type === 'AUTHENTICATE') {
                    const { chatId } = payload
                    connections.set(chatId, socket)
                }

                if (type === 'SEND_MESSAGE') {
                    const { chatId } = payload
                    const chatSocket = connections.get(chatId)

                    if (chatSocket) {
                        chatSocket.emit('new-message', 1)
                    }
                }
            })

        })

    }
    res.end()
}

export default SocketHandler