import React from 'react'
import { Box, Flex } from '@chakra-ui/react'


const ChatArea = () => {
    return (
        <Flex h='full' direction="column" w='full'>
            <Box px='2' py='3' h={ ['14', null, null, '16'] } shadow='md'>
                hi
            </Box>
        </Flex>

    )
}

export default ChatArea