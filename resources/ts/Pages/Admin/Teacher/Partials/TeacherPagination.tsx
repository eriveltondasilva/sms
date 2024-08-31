import { Pagination } from '@/Components/Pagination'
import type { TeacherPaginationProps } from '../types'

export function TeacherPagination({ pagination }: TeacherPaginationProps) {
  return (
    <Pagination>
      <Pagination.Left
        to={pagination.to}
        from={pagination.from}
        total={pagination.total}
      />
      <Pagination.Right>
        <Pagination.Previous href={pagination.prev_page_url} />
        <Pagination.Next href={pagination.next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}
