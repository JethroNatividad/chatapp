import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import fetcher from '../lib/fetcher'

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
            <Input value={ searchText } onChange={ (e) => setSearchText(e.target.value) } />
            { JSON.stringify(searchResults) }
        </Box>
    )
}

export default SearchUsers