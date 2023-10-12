import { z } from 'zod'

const FinishedItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverImageUrl: z.string(),
  publisher: z.string(),
  synopsis: z.string(),
  pageCount: z.number(),
  startDate: z.date(),
  finishDate: z.date(),
  rating: z.number().nullable(),
  notes: z.string().nullable(),
  userId: z.string(),
})

type FinishedItem = z.infer<typeof FinishedItemSchema>

export const isFinishedItem = (item: any): item is FinishedItem => {
  return FinishedItemSchema.safeParse(item).success
}
