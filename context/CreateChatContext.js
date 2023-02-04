import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher, { poster } from '../lib/fetcher'


const CreateChatContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {},
    createChat: async () => {},
    selectedUsers: [],
    toggleSelectUser: () => {},
})

export function CreateChatProvider({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedUsers, setSelectedUsers] = useState([])

    const toggleSelectUser = (user) => {
        if (selectedUsers.some(u => u._id === user._id)) {
            return setSelectedUsers(prev => prev.filter(u => u._id !== user._id))
        }
        return setSelectedUsers(prev => [...prev, user])
    }

    async function createChat() {
        const [error, data] = await poster('/api/chats', { users: selectedUsers.map(u => u._id) })
        if (error) return console.log(error)
        console.log(data)
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