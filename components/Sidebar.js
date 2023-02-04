import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useChat } from '../context/ChatContext'
import { useCreateChat } from '../context/CreateChatContext'
import Chat from './Chat'

const Sidebar = () => {
    const { onOpen } = useCreateChat()
    const { chatList } = useChat()

    return (
        <Flex direction='column' h='full' w='full' bg="blackAlpha.300">
            <Box px='2' py='3' h={ ['14', null, null, '16'] } shadow='md' >
                <Button onClick={ onOpen } size={ ['sm', null, null, 'md'] }>Create a conversation</Button>
            </Box>
            <Box overflowY='auto'>
                { chatList.map(chat => (
                    <Chat key={ chat.id } last_message={ chat.last_message } username={ chat.name ? chat.name : chat.users.map((user) => user.username).join(", ") } />
                )) }
            </Box>
        </Flex >
    )
}

export default Sidebar