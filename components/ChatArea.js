import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'


const ChatArea = () => {
    return (
        <Flex h='full' direction="column" w='full'>
            <Box px='5' py='3' h={ ['14', null, null, '16'] } shadow='md'>
                <Text fontSize='2xl'>Username</Text>
            </Box>
        </Flex>

    )
}

export default ChatArea