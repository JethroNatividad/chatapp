import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { CreateChatProvider } from '../context/CreateChatContext'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <CreateChatProvider>
          <Component { ...pageProps } />
        </CreateChatProvider>
      </ChakraProvider>
    </AuthProvider>
  )
}

export default MyApp
