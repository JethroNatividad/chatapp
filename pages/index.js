import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import Sidebar from '../components/Sidebar'
import ChatArea from '../components/ChatArea'
import { Box } from '@chakra-ui/react'


const Index = () => {
  const { user, userLoading, logout } = useAuth()
  const router = useRouter()

  if (!userLoading && !user) {
    router.push('/login')
    return null
  }

  if (userLoading) return <div>Loading...</div>

  return (
    <Box display="flex" h='100vh'>
      <Box h='full' w={ ['sm'] }>
        <Sidebar />
      </Box>
      <Box h='full' flex='1'>
        <ChatArea />
      </Box>
      {/* <h1>Hello { user.username }</h1>
      <button onClick={ logout }>Logout</button> */}
    </Box>
  )
}

export default Index
