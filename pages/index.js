import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import CreateChat from '../components/CreateChat'


const Index = () => {
  const { user, userLoading, logout } = useAuth()
  const router = useRouter()

  if (!userLoading && !user) {
    router.push('/login')
    return null
  }

  if (userLoading) return <div>Loading...</div>

  return (
    <Flex h='100vh' pos='relative'>
      <Box h='full' w={ ['sm'] }>
        <Sidebar />
      </Box>
      <Box h='full' flex='1'>
        <ChatArea />
      </Box>
      <CreateChat />
      {/* <h1>Hello { user.username }</h1>
      <button onClick={ logout }>Logout</button> */}
    </Flex>
  )
}

export default Index
