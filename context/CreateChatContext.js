import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher from '../lib/fetcher'


const CreateChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    createChat: async () => {},
})

export function CreateChatProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    async function createChat(ids) {
        console.log('create chat')
    }

    return (
        <CreateChatContext.Provider value={ { isOpen, onOpen, onClose, createChat } }>
            { children }
        </CreateChatContext.Provider>
    )
}

export function useCreateChat() {
    return useContext(CreateChatContext)
}