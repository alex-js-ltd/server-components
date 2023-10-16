import { z } from 'zod'

const FinishedBookSchema = z.object({
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

type FinishedBook = z.infer<typeof FinishedBookSchema>

const isFinishedBook = (item: unknown): item is FinishedBook => {
  return FinishedBookSchema.safeParse(item).success
}

const LoadingBookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  coverImageUrl: z.string(),
  publisher: z.string(),
  synopsis: z.string(),
  pageCount: z.number(),
  loading: z.boolean(),
})

type LoadingBook = z.infer<typeof LoadingBookSchema>

const isLoadingBook = (item: unknown): item is LoadingBook => {
  return LoadingBookSchema.safeParse(item).success
}

const NullableStringSchema = z.string().nullable()

type NullableString = z.infer<typeof NullableStringSchema>

const isNullableString = (item: unknown): item is NullableString => {
  return NullableStringSchema.safeParse(item).success
}

export { isFinishedBook, isLoadingBook, isNullableString }

export type { LoadingBook }
