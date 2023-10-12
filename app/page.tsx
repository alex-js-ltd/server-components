import type { User } from '@clerk/nextjs/api'
import { lazy, Fragment } from 'react'
import { currentUser } from '@clerk/nextjs'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

const Home = async () => {
  const user: User | null = await currentUser()
  return (
    <Fragment>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Fragment>
  )
}

export default Home
