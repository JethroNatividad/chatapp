import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'


const Index = () => {
  const { user, userLoading } = useAuth()
  const router = useRouter()

  if (!userLoading && !user) {
    router.push('/login')
  }

  return (
    <div>
      <h1>Hello { userLoading ? 'loading' : user?.username }</h1>
    </div>
  )
}

export default Index
