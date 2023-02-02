import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import Chat from './Chat'

const Sidebar = () => {
    return (
        <Flex flexDir='column' h='full' w='full' >
            <Box px='2' py='3' shadow='sm' bg="blackAlpha.400">
                <Button>Start a conversation</Button>
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
        </Flex>
    )
}

export default Sidebar