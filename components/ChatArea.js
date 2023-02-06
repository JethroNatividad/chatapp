import React from 'react'
import { Box, IconButton, Flex, Input, Text, Icon } from '@chakra-ui/react'
import { useChat } from '../context/ChatContext'


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
            <Flex px="5" py="3">
                <Input type='text' placeholder='Write a message..' /><IconButton icon={ <Icon h={ 5 } w={ 5 } color='white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

                </Icon>
                } variant='outline' />
            </Flex>
        </Flex>

    )
}

export default ChatArea