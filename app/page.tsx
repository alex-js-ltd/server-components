import type { User } from '@clerk/nextjs/api'
import { lazy } from 'react'
import { currentUser } from '@clerk/nextjs'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const user: User | null = await currentUser()
  return (
    <>
      {user ? (
        <AuthenticatedApp searchParams={searchParams} />
      ) : (
        <UnauthenticatedApp />
      )}
    </>
  )
}

export default Home
