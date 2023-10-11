import './globals.css'
import type { User } from '@clerk/nextjs/api'
import { ClerkProvider } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs'
import AuthenticatedLayout from '@/comps/authenticated-layout'

export const metadata = {
  title: 'Next.js 13 with Clerk',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user: User | null = await currentUser()

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
