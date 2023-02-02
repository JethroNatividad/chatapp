import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher from '../lib/fetcher'


const CreateChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    createChat: async () => {},
    selectedUsers: [],
    selectUser: () => {},
    removeSelectedUser: () => {},
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

    const selectUser = (user) => {
        setSelectedUsers(prev => [...prev, user])
    }

    const removeSelectedUser = (user) => {
        setSelectedUsers(prev => prev.filter(u => u.id !== user.id))
    }

    async function createChat() {

        console.log(selectedUsers)
    }



    return (
        <CreateChatContext.Provider value={ { isOpen, onOpen, onClose, createChat, selectedUsers, selectUser, removeSelectedUser } }>
            { children }
        </CreateChatContext.Provider>
    )
}

export function useCreateChat() {
    return useContext(CreateChatContext)
}