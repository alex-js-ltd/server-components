import type { ReactNode } from 'react'
import type { User } from '@clerk/nextjs/api'

import { Fragment } from 'react'
import { Button } from '@/comps/buttons'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

const AuthenticatedApp = async ({ children }: { children: ReactNode }) => {
  const user: User | null = await currentUser()

  const email = user?.emailAddresses[0]?.emailAddress

  return (
    <Fragment>
      <div className="flex items-center absolute top-10 right-10">
        {email}
        <Button variant="secondary" className="ml-10">
          Logout
        </Button>
      </div>

      <div className="mx-auto max-w-screen-lg py-24 px-10 w-full grid gap-4 grid-cols-[1fr_3fr]">
        <div className="relative">
          <Nav />
        </div>

        <main className="w-full">{children}</main>
      </div>
    </Fragment>
  )
}

const Nav = () => (
  <nav className="sticky top-4 px-6 py-4 border border-gray-100 rounded">
    <ul className="list-none p-0">
      <li>
        <Link href="/reading-list">Reading List</Link>
      </li>
      <li>
        <Link href="/finished">Finished Books</Link>
      </li>
      <li>
        <Link href="/discover">Discover</Link>
      </li>
    </ul>
  </nav>
)

export default AuthenticatedApp
