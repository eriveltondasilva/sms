import type { SchoolYear, User } from '@/Types'

type Flash = {
  message: string
  link?: string
}

type Auth = {
  user: User
  activeYear: SchoolYear
}

export type PageProps<T extends Record<string, any> = Record<string, any>> =
  T & {
    auth: Auth
    flash: Flash | null
  }
