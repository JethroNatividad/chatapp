import React from 'react'
import { Avatar, Text, Flex, Box } from '@chakra-ui/react'

const Chat = () => {
    return (
        <Flex px='3' py='2' align='center'>
            <Avatar name='User' />
            <Box flex='1' px='2'>
                <Text fontSize='xl' >Username</Text>
                <Text noOfLines={ 1 }>Last meddddddddddddddddddeashas ahsdjasdhahdshasdashdahsdhadh asdhad</Text>
            </Box>
        </Flex>
    )
}

export default Chat