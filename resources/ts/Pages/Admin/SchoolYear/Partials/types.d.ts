import type { SchoolYear } from '@/Types'

type SchoolYearWithCount = SchoolYear & {
  groups_count: number
}

export type SchoolYearCardProps = {
  schoolYears: SchoolYearWithCount[]
}

export type SchoolYearModelProps = {
  show: boolean
  schoolYear: SchoolYear
  onClose: (show: boolean) => void
}

export type SchoolYearFormDataProps = {
  data?: SchoolYear
  errors: any
}
