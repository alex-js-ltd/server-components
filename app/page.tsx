import { Fragment } from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import UnAuthenticatedApp from './unauthenticated-app'
import AuthenticatedApp from './authenticated-app'

const Home = () => (
  <Fragment>
    <SignedIn>
      <AuthenticatedApp />
    </SignedIn>
    <SignedOut>
      <UnAuthenticatedApp />
    </SignedOut>
  </Fragment>
)

export default Home
