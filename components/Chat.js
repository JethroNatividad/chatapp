import React from 'react'
import { Avatar, Text, Flex, Box } from '@chakra-ui/react'

const Chat = () => {
    return (
        <Flex px='3' py='2' align='center' cursor='pointer' _hover={ {
            bg: 'blackAlpha.400'
        } }>
            <Avatar name='User' />
            <Box flex='1' px='2'>
                <Flex justifyContent='space-between'>
                    <Text fontSize='xl' >Username</Text>
                    <Text fontSize='sm' color='gray.500' ml='auto'>12:00</Text>
                </Flex>
                <Text noOfLines={ 1 }>Last meddddddddddddddddddeashas ahsdjasdhahdshasdashdahsdhadh asdhad</Text>
            </Box>
        </Flex>
    )
}

export default Chat