import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useChat } from '../context/ChatContext'
import ChatInput from './ChatInput'


const ChatArea = () => {
    const { activeChat } = useChat()
    if (!activeChat) {
        return (
            <Flex h='full' w='full' justifyContent='center' alignItems='center'>
                <Text fontSize='lg'>Open or start a conversation</Text>
            </Flex>
        )
    }
    return (
        <Flex h='full' direction="column" w='full'>
            <Box px='5' py='3' h={ ['14', null, null, '16'] } shadow='md'>
                <Text fontSize='2xl'>{ activeChat.name ? activeChat.name : activeChat.users.map((user) => user.username).join(", ") }</Text>
            </Box>
            <Box flex={ 1 }>
                Chats
            </Box>
            <Box px="5" py="3">
                <ChatInput />
            </Box>
        </Flex>

    )
}

export default ChatArea