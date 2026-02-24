export interface PaginatedData<T> {
  current_page: number
  last_page: number
  per_page: number
  from: number | null
  to: number | null
  total: number

  path: string
  first_page_url: string
  next_page_url: string | null
  prev_page_url: string | null
  last_page_url: string

  links: {
    url: string | null
    label: string
    page: number | null
    active: boolean
  }[]

  data: T[]
}

export interface SimplePaginatedData<T> {
  current_page: number
  to: number | null
  from: number | null
  per_page: number

  path: string
  current_page_url: string
  first_page_url: string
  prev_page_url: string | null
  next_page_url: string | null

  data: T[]
}
