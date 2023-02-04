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
})

export function ChatProvider({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [activeChat, setActiveChat] = useState(null)

    const setActiveChatId = async (chatId) => {
        const [error, data] = await fetcher(`/api/chats/${chatId}`)
        if (error) return console.log(error)
        console.log(data)
        setActiveChat(data.chat)
    }


    return (
        <ChatContext.Provider value={ { isOpen, onOpen, onClose, activeChat, setActiveChatId } }>
            <CreateChatProvider>
                { children }
            </CreateChatProvider>
        </ChatContext.Provider>
    )
}

export function useChat() {
    return useContext(ChatContext)
}