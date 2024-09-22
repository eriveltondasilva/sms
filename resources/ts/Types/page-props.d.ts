import type { SchoolYear, User } from '@/Types'

type Flash = Partial<{
  message: string
  link: string
  status: 'success' | 'error'
}>

type Auth = Readonly<{
  user: User
  activeYear: SchoolYear
}>

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: Auth
  flash: Flash
}
