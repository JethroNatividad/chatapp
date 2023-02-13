import { useDisclosure } from '@chakra-ui/react'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher, { poster } from '../lib/fetcher'
import { CreateChatProvider } from './CreateChatContext'
import io from 'Socket.IO-client'

const ChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    activeChat: null,
    setActiveChatId: () => {},
    chatList: [],
    sendMessage: async () => {}
})

let socket

export function ChatProvider({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeChat, setActiveChat] = useState(null)
    const [chatList, setChatList] = useState([])
    const [testMessages, setTestMessages] = useState([])

    useEffect(() => {
        const fn = async () => {
            const [error, data] = await fetcher('/api/chats')
            if (error) return console.log(error)
            setChatList(data.chats)

            await fetcher('/api/socket')
            socket = io({
                query: {
                    chatIds: JSON.stringify(data.chats.map(chat => chat.id))
                }
            })

            socket.on('connect', () => {
                console.log('connected')
            })

            socket.on('new-message', () => {
                console.log('New message')
            })

            socket.on('receive-message', (data) => {
                data = JSON.parse(data)
                console.log('Received message:', data)
                // setTestMessages(prevState => [...prevState, data])
                if (activeChat && data.chat === activeChat.id) {
                    console.log('Active chat:', activeChat)
                    setActiveChat(prevState => ({ ...prevState, messages: [...prevState.messages, data] }))
                }
            })
        }
        fn()
    }, [activeChat])

    const setActiveChatId = async (chatId) => {
        const [error, data] = await fetcher(`/api/chats/${chatId}`)
        if (error) return console.log(error)
        console.log('activechat', data)
        setActiveChat(data.chat)
    }

    const sendMessage = async (text) => {
        console.log(text)
        if (!activeChat) return console.log("No active chat")
        const [error, data] = await poster(`/api/chats/${activeChat.id}/messages`, { text, attachments: [] })
        if (error) return console.log(error)
        socket.emit('send-message', JSON.stringify({ chatId: activeChat.id, message: data.data }))
    }

    return (
        <ChatContext.Provider value={ { isOpen, onOpen, onClose, activeChat, setActiveChatId, chatList, sendMessage, testMessages } }>
            <CreateChatProvider>
                { children }
            </CreateChatProvider>
        </ChatContext.Provider>
    )
}

export function useChat() {
    return useContext(ChatContext)
}