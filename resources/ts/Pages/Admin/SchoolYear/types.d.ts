import type { PageProps, SchoolYear } from '@/Types'

type SchoolYearWithCount = SchoolYear & {
  groups_count: number
}

export type SchoolYearIndexProps = {
  schoolYears: SchoolYearWithCount[]
}

export type SchoolYearCreateProps = PageProps

export type SchoolYearEditProps = PageProps<{
  schoolYear: SchoolYear
}>

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
