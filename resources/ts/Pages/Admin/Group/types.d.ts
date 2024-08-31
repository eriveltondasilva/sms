import type { Group, PageProps } from '@/Types'

export type GroupIndexProps = PageProps<{
  groups: Group[]
}>

export type GroupCardProps = {
  groups: Group[]
}

export type GroupEditProps = PageProps<{
  group: Group
}>

export type GroupCreateProps = PageProps

export type GroupFormDataProps = {
  data?: Group
  errors: any
}
