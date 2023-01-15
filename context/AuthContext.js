import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import fetcher from '../lib/fetcher'
import { setCookie, deleteCookie } from 'cookies-next'


const AuthContext = createContext({
    user: null,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fn = async () => {
            try {
                const [error, data] = await fetcher('/api/auth/me')
                if (error) {
                    throw new Error(error.message)
                }
                setUser(data.user)
            } catch (error) {
                console.log(error)
            }
        }
        fn()
    }, [])

    async function login({ email, password }) {
        // handle login logic
        // and set the user state
        try {
            const response = await axios.post('/api/auth/login', { email, password })
            if (response.data.error) {
                throw new Error(response.data.error.message)
            }
            setUser(response.data.user)
            setCookie('accessToken', response.data.token)
            // cookieStorageManager.set('token', response.data.token)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function register({ username, email, password }) {
        // handle register logic
        // and set the user state
        try {
            const response = await axios.post('/api/auth/register', { username, email, password })
            if (response.data.error) {
                throw new Error(response.data.error.message)
            }
            setUser(response.data.user)
            setCookie('accessToken', response.data.token)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    async function logout() {
        // handle logout logic
        // and set the user state to null
        try {
            setUser(null)
            deleteCookie('accessToken')
            await axios.post('/api/auth/logout')

        } catch (error) {
            throw new Error(error.message)
        }
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