import { lazy, Suspense } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

const Home = () => (
  <Suspense>
    <SignedIn>
      <AuthenticatedApp />
    </SignedIn>
    <SignedOut>
      <UnauthenticatedApp />
    </SignedOut>
  </Suspense>
)

export default Home
