import { Box, Input, Stack, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCreateChat } from '../context/CreateChatContext'
import fetcher from '../lib/fetcher'
import User from './User'

const SearchUsers = () => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [timeouts, setTimeouts] = useState()
    const { selectedUsers, toggleSelectUser } = useCreateChat()
    const handleToggle = ({ username, tag, _id }) => {
        toggleSelectUser({ username, tag, _id })
    }


    useEffect(() => {
        const fn = async () => {
            if (searchText !== '') {
                const [error, data] = await fetcher(`/api/users?search=${searchText}`)
                if (error) return setSearchResults([])
                return setSearchResults(data.users)
            }
            return setSearchResults([])
        }
        clearTimeout(timeouts)

        setTimeouts(setTimeout(() => {
            fn()
        }, 500))
    }, [searchText])

    return (
        <Box>
            <Input mb='3' value={ searchText } onChange={ (e) => setSearchText(e.target.value) } />
            <Stack>
                { searchResults.map((user) => (
                    <User key={ user._id } { ...user } />
                )) }
            </Stack>

            <Stack direction='row' overflowX='scroll'>
                { selectedUsers.map(user => (
                    // <Badge colorScheme='green' key={ user.id }>{ user.username }</Badge>
                    <Flex onClick={ () => handleToggle({ username: user.username, tag: user.tag, _id: user._id }) } alignItems='center' px={ 2 } rounded='lg' py={ 1 } bg='blue.700' key={ user.id }>
                        <Text>{ user.username }#{ user.tag }</Text>
                        <Box w={ 4 } h={ 4 }>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Box>

                    </Flex>
                )) }
                {/* <Badge>Default</Badge>
                <Badge colorScheme='green'>Success</Badge>
                <Badge colorScheme='red'>Removed</Badge>
                <Badge colorScheme='purple'>New</Badge> */}
            </Stack>

        </Box>
    )
}

export default SearchUsers