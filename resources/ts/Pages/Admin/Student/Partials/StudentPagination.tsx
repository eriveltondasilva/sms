import { Pagination } from '@/Components/Pagination'
import { StudentPaginationProps } from '../types'

export function StudentPagination({ pagination }: StudentPaginationProps) {
  return (
    <Pagination>
      <Pagination.Left
        to={pagination?.to ?? 0}
        from={pagination?.from ?? 0}
        total={pagination.total}
      />
      <Pagination.Right>
        <Pagination.Previous href={pagination?.prev_page_url ?? ''} />
        <Pagination.Next href={pagination?.next_page_url ?? ''} />
      </Pagination.Right>
    </Pagination>
  )
}
