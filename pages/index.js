import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'


const Index = () => {
  const { user, userLoading, logout } = useAuth()
  const router = useRouter()

  if (!userLoading && !user) {
    router.push('/login')
    return null
  }

  if (userLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Hello { user.username }</h1>
      <button onClick={ logout }>Logout</button>
    </div>
  )
}

export default Index
