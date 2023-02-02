import { Box, Input, Stack, Badge } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCreateChat } from '../context/CreateChatContext'
import fetcher from '../lib/fetcher'
import User from './User'

const SearchUsers = () => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [timeouts, setTimeouts] = useState()
    const { selectedUsers } = useCreateChat()


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
            { searchResults.map((user) => (
                <User key={ user.id } { ...user } />
            )) }

            <Stack direction='row'>
                { selectedUsers.map(user => (
                    <Badge key={ user.id }>{ user.username }</Badge>
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