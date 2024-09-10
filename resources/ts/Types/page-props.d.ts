import type { SchoolYear, User } from '@/Types'

type Flash = {
  message: string
  link?: string
}

type Auth = {
  user: User
  activeYear: SchoolYear
}

export type PageProps<T = object> = T & {
  auth: Auth | null
  flash: Flash | null
}
