import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ username, text, createdAt }) => {
    return (
        <Flex px='3' py='2' align='center' cursor='pointer' _hover={ {
            bg: 'blackAlpha.400'
        } }>
            <Avatar name={ username } />
            <Box flex='1' px='2'>
                <Flex justifyContent='space-between'>
                    <Text fontSize='xl' >{ username }</Text>
                    <Text fontSize='sm' color='gray.500' ml='auto'>{ createdAt }</Text>
                </Flex>
                <Text>{ text }</Text>
            </Box>
        </Flex>
    )
}

export default Message