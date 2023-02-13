import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../context/AuthContext'
import { ChatProvider } from '../context/ChatContext'
import pusherConfig from '../lib/pusherConfig'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PusherProvider { ...pusherConfig }>
        <ChakraProvider>
          <ChatProvider>
            <Component { ...pageProps } />
          </ChatProvider>
        </ChakraProvider>
      </PusherProvider>;

    </AuthProvider>
  )
}

export default MyApp
