import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher from '../lib/fetcher'


const CreateChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    createChat: async () => {},
    selectedUsers: [],
    toggleSelectUser: () => {},
})

export function CreateChatProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const toggleSelectUser = (user) => {
        if (selectedUsers.some(u => u.id === user.id)) {
            return setSelectedUsers(prev => prev.filter(u => u.id !== user.id))
        }
        return setSelectedUsers(prev => [...prev, user])
    }

    async function createChat() {

        console.log(selectedUsers)
    }



    return (
        <CreateChatContext.Provider value={ { isOpen, onOpen, onClose, createChat, selectedUsers, toggleSelectUser } }>
            { children }
        </CreateChatContext.Provider>
    )
}

export function useCreateChat() {
    return useContext(CreateChatContext)
}