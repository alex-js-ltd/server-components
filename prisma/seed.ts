import { PrismaClient } from '@prisma/client'
import { bookData } from './book-data'

const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    bookData?.map(async (book: any) => {
      return prisma.book.upsert({
        where: { id: book.id, title: book.title },
        update: {},
        create: {
          ...book,
        },
      })
    }),
  )

  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
    },
  })
}

run()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
