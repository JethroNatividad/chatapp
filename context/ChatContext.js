import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher, { poster } from '../lib/fetcher'


const ChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    activeChat: null,
    setActiveChatId: () => {},
})

export function CreateChatProvider({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [activeChat, setActiveChat] = useState(null)

    const setActiveChatId = async (chatId) => {
        const [error, data] = await fetcher(`/api/chats/${chatId}`)
        if (error) return console.log(error)
        setActiveChat(data.chat)
    }


    return (
        <ChatContext.Provider value={ { isOpen, onOpen, onClose, activeChat, setActiveChatId, toggleSelectUser } }>
            { children }
        </ChatContext.Provider>
    )
}

export function useCreateChat() {
    return useContext(ChatContext)
}