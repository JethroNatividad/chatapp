import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import Chat from './Chat'

const Sidebar = () => {
    return (
        <Box h='full' w='full' >
            <Box px='2' py='3' shadow='sm' bg="blackAlpha.400">
                <Button>Start a conversation</Button>
            </Box>
            <Box>
                <Chat />
            </Box>
        </Box>
    )
}

export default Sidebar