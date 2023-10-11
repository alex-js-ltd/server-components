import { lazy, Suspense } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

export default function Home() {
  return (
    <Suspense>
      <SignedIn>
        <AuthenticatedApp />
      </SignedIn>
      <SignedOut>
        <UnauthenticatedApp />
      </SignedOut>
    </Suspense>
  )
}
