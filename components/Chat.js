import React from 'react'
import { Avatar, Text, Flex, Box } from '@chakra-ui/react'

const Chat = ({ username, last_message, last_message_at, handleClick }) => {
    return (
        <Flex onClick={ handleClick } px='3' py='2' align='center' cursor='pointer' _hover={ {
            bg: 'blackAlpha.400'
        } }>
            <Avatar name={ username } />
            <Box flex='1' px='2'>
                <Flex justifyContent='space-between'>
                    <Text fontSize='xl' >{ username }</Text>
                    <Text fontSize='sm' color='gray.500' ml='auto'>{ last_message_at }</Text>
                </Flex>
                <Text noOfLines={ 1 }>{ last_message }</Text>
            </Box>
        </Flex>
    )
}

export default Chat