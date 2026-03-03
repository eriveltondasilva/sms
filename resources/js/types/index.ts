export type * from './auth'
export type * from './navigation'
export type * from './ui'
export type * from './pagination'

export interface DataTableColumn<T> {
  header: string
  className?: string
  headerClassName?: string
  cellClassName?: string
  renderCell: (row: T) => React.ReactNode
}

export type PageInfo = {
  title: string;
  description: string;
};