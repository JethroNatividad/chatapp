import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { Box, Button, Flex } from '@chakra-ui/react'


const Index = () => {
  const { user, userLoading, logout } = useAuth()
  const router = useRouter()
  const handleLogout = async () => {
    router.push('/login')
    await logout()
  }

  if (!userLoading && !user) {
    router.push('/login')
  }

  return (
    <Flex w='100%' h='100vh' bg="gray.800">
      <Flex direction="column" justify="space-between" maxW="md" w='100%' bg='whiteAlpha.50'>
        <Flex p="4" justify="center" align="center">
          <Button bg='blackAlpha.300' w='full'>Create a conversation</Button>
        </Flex>
        <Box flex='1'>

        </Box>
        <Flex bg="blackAlpha.300" p="3" justify="center" align="center">
          <Button onClick={ handleLogout } w='full'>Logout</Button>
        </Flex>
      </Flex>
      <Box>
        <h1>Hello { userLoading ? 'loading' : user?.username }</h1>
      </Box>
    </Flex>
  )
}

export default Index
