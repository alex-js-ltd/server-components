import './globals.css'
import type { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import AuthenticatedLayout from '@/comps/authenticated-layout'

import { SignedIn, SignedOut } from '@clerk/nextjs'

export const metadata = {
  title: 'Next.js 13 with Clerk',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <SignedIn>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </SignedIn>
          <SignedOut>{children}</SignedOut>
        </body>
      </ClerkProvider>
    </html>
  )
}
