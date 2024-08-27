import { type LucideIcon } from 'lucide-react'

export * from './group'
export * from './page-props'
export * from './visit-options'

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

type Pagination = {
  current_page: number
  first_page_url: string
  from: number
  last_page_url: string
  last_page: number
  links: {
    active: boolean
    label: string
    url?: string
  }
  next_page_url?: string
  path: string
  per_page: number
  prev_page_url?: string
  to: number
  total: number
}

export type StudentPagination = {
  data: Student[]
} & Pagination

export type TeacherPagination = {
  data: Teacher[]
} & Pagination

export type SchoolYear = {
  id: number
  year: number
  start_date: string
  end_date: string
  is_active: boolean
}

export type Subject = {
  id: number
  name: string
  abbr: string
}
