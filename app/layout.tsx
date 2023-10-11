import './globals.css'
import type { ReactNode } from 'react'
import type { User } from '@clerk/nextjs/api'
import { ClerkProvider, currentUser } from '@clerk/nextjs'
import AuthenticatedLayout from '@/comps/authenticated-layout'

export const metadata = {
  title: 'Next.js 13 with Clerk',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user: User | null = await currentUser()

  console.log('userId', user?.id)

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {user ? (
            <AuthenticatedLayout user={user}>{children}</AuthenticatedLayout>
          ) : (
            children
          )}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
