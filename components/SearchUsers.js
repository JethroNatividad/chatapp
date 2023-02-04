import { Box, Input, Stack, Flex, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCreateChat } from '../context/CreateChatContext'
import fetcher from '../lib/fetcher'
import User from './User'

const SearchUsers = () => {
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [timeouts, setTimeouts] = useState()


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
            <Input placeholder='Search for username or tag' mb='3' value={ searchText } onChange={ (e) => setSearchText(e.target.value) } />
            <Stack maxH='52' overflowY='scroll'>
                { searchResults.map((user) => (
                    <User key={ user._id } { ...user } />
                )) }
            </Stack>

        </Box>
    )
}

export default SearchUsers