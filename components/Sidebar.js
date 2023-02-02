import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const Sidebar = () => {
    return (
        <Box h='full' w='full' >
            <Box px='2' py='3' shadow='sm' bg="blackAlpha.400">
                <Button>Start a conversation</Button>
            </Box>
        </Box>
    )
}

export default Sidebar