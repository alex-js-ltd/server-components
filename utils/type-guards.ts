import { z } from 'zod'

const ListItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverImageUrl: z.string(),
  publisher: z.string(),
  synopsis: z.string(),
  pageCount: z.number(),
  startDate: z.date(),
  finishDate: z.date().nullable(),
  rating: z.number().nullable(),
  notes: z.string().nullable(),
  userId: z.string(),
})

type ListItem = z.infer<typeof ListItemSchema>

const isListItem = (item: any): item is ListItem => {
  return ListItemSchema.safeParse(item).success
}

export { isListItem }
