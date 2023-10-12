import type { ReactNode, ComponentProps } from 'react'
import type { User } from '@clerk/nextjs/api'

import { Fragment } from 'react'
import { SignOutButton } from '@/comps/buttons'
import Link from 'next/link'

const AuthenticatedLayout = ({
  user,
  children,
}: {
  user: User
  children: ReactNode
}) => {
  const email = user?.emailAddresses[0]?.emailAddress

  return (
    <Fragment>
      <div className="flex items-center absolute top-10 right-10">
        {email}

        <SignOutButton />
      </div>

      <div className="mx-auto max-w-screen-lg py-24 px-10 w-full grid gap-4 grid-cols-[1fr] md:grid-cols-[1fr_3fr]">
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
        <StyledLink href="/list">Reading List</StyledLink>
      </li>
      <li>
        <StyledLink href="/finished">Finished Books</StyledLink>
      </li>
      <li>
        <StyledLink href="/ ">Discover</StyledLink>
      </li>
    </ul>
  </nav>
)

const StyledLink = (props: ComponentProps<typeof Link>) => (
  <Link
    className="block p-2 pl-3 my-1 w-full h-full text-gray-600 rounded-2 border-l-5 border-transparent hover:text-indigo-300 hover:no-underline hover:bg-gray-100 focus:text-indigo-600 focus:no-underline focus:bg-gray-200 rounded"
    {...props}
  />
)

export default AuthenticatedLayout
