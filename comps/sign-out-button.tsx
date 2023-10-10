'use client'

import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation'
import { Button } from './buttons'

const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const onClick = () =>
    signOut().then(() => router.push('/', { scroll: false }))

  return (
    <Button variant="secondary" onClick={onClick} className="ml-10">
      Sign out
    </Button>
  )
}

export default SignOutButton
