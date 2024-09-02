import type { SchoolYear, User } from '@/Types'

type Flash = {
  message?: string
  link?: string
}

export type PageProps<T = {}> = T & {
  auth: {
    user: User
    activeYear: SchoolYear
  }
  flash: Flash
}
