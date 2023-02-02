import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useCreateChat } from '../context/CreateChatContext'
import Chat from './Chat'

const Sidebar = () => {
    const { onOpen } = useCreateChat()

    return (
        <Flex direction='column' h='full' w='full' bg="blackAlpha.300">
            <Box px='2' py='3' h={ ['14', null, null, '16'] } shadow='md' >
                <Button onClick={ onOpen } size={ ['sm', null, null, 'md'] }>Create a conversation</Button>
            </Box>
            <Box overflowY='scroll'>
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
                <Chat />
            </Box>
        </Flex >
    )
}

export default Sidebar