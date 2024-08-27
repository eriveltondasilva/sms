import type { SchoolYear } from '@/Types'

export type Role = 'superadmin' | 'admin' | 'teacher' | 'student' | 'user'

interface User {
  id: number
  username: string
  email: string
  email_verified_at?: string
  is_active: boolean
  avatar_url?: string
  password?: string
  role: Role
}

interface Flash {
  message: string
  link: string
}

interface Auth {
  user: User
  activeYear: SchoolYear
}

export type PageProps<T = {}> = T & {
  auth: Auth
  flash: Partial<Flash>
}
