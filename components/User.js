import React from 'react'
import { Avatar, Text, Flex, Box } from '@chakra-ui/react'
import { useCreateChat } from '../context/CreateChatContext'

const User = ({ username, email, tag, id }) => {
    const { toggleSelectUser, selectedUsers } = useCreateChat()
    const handleClick = () => {
        toggleSelectUser({ username, tag, id })
    }
    const isSelected = selectedUsers.some(user => user.id === id)
    return (
        <Flex onClick={ handleClick } px='2' bg={ isSelected && 'blackAlpha.300' } py='1' rounded='md' align='center' cursor='pointer' _hover={ {
            bg: 'blackAlpha.300'
        } }>
            <Avatar name={ username } />
            <Box flex='1' px='2'>
                <Flex align='center'>
                    <Text fontSize='xl'>{ username }</Text>
                    <Text fontSize='md' color='gray.500'>#{ tag }</Text>
                </Flex>
                <Text>{ email }</Text>
            </Box>

        </Flex>
    )
}

export default User