import type { LucideIcon } from 'lucide-react'

export type { PageProps } from './page-props'
export type { PaginatedData } from './pagination'
export type { VisitOptions } from './visit-options'

export type Role = 'superadmin' | 'admin' | 'teacher' | 'student' | 'user'

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Stats = {
  title: string
  value: number
  icon: LucideIcon
}

export type BreadcrumbItem = {
  title: string
  route?: string
}

type Address = {
  address_street: string
  address_city: string
  address_state: string
  address_zip_code: string
}

export type User = {
  id: number
  username: string
  email: string
  is_active: boolean
  avatar_url: string | null
  role: Role
}

export type Student = {
  id: number
  name: string
  gender: string
  email: string
  rg: string
  cpf: string
  birthday: string
  birthplace: string
  phone: string
  gov_benefits: string
  health_problems: string
  note: string
} & Address

export type Teacher = {
  id: number
  name: string
  gender: string
  email: string
  rg: string
  cpf: string
  birthday: string
  phone: string
} & Address

export type SchoolYear = {
  id: number
  year: number
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string | null
  updated_at: string | null
}

export type Subject = {
  id: number
  name: string
  abbr: string
}

export type Group = {
  id: number
  name: string
  classroom: string
  shift: string
  school_year_id: number
  students_count?: number
  teachers_count?: number
}
