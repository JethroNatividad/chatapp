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

    function register(username, email, password) {
        // handle register logic
        // and set the user state
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