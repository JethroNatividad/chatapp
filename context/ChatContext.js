import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher, { poster } from '../lib/fetcher'
import { CreateChatProvider } from './CreateChatContext'

const ChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    activeChat: null,
    setActiveChatId: () => {},
    chatList: [],
    sendMessage: async () => {}
})

export function ChatProvider({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [activeChat, setActiveChat] = useState(null)
    const [chatList, setChatList] = useState([])

    useEffect(() => {
        const fn = async () => {
            const [error, data] = await fetcher('/api/chats')
            if (error) return console.log(error)
            setChatList(data.chats)
        }
        fn()
    }, [])

    const setActiveChatId = async (chatId) => {
        const [error, data] = await fetcher(`/api/chats/${chatId}`)
        if (error) return console.log(error)
        console.log(data)
        setActiveChat(data.chat)
    }

    const sendMessage = async (text) => {
        console.log(text)
        if (!activeChat) return console.log("No active chat")
        const [error, data] = await poster(`/api/chats/${activeChat.id}/messages`, { text, attachments: [] })
        if (error) return console.log(error)
        console.log(data)
    }

    return (
        <ChatContext.Provider value={ { isOpen, onOpen, onClose, activeChat, setActiveChatId, chatList, sendMessage } }>
            <CreateChatProvider>
                { children }
            </CreateChatProvider>
        </ChatContext.Provider>
    )
}

export function useChat() {
    return useContext(ChatContext)
}