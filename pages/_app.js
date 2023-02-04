import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { ChatProvider } from '../context/ChatContext'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <ChatProvider>
          <Component { ...pageProps } />
        </ChatProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
