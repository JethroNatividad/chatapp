import { cookieStorageManager } from '@chakra-ui/react'
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        // check for existing user session
        // and set the user state accordingly
    }, [])

    function login(username, password) {
        // handle login logic
        // and set the user state
    }

    async function register(username, email, password) {
        // handle register logic
        // and set the user state
        try {
            const response = await axios.post('/api/auth/register', { username, email, password })
            if (response.data.error) {
                throw new Error(response.data.error.message)
            }
            setUser(response.data.user)
            cookieStorageManager.set('token', response.data.token)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    function logout() {
        // handle logout logic
        // and set the user state to null
    }

    return (
        <AuthContext.Provider value={ { user, login, logout, register } }>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}