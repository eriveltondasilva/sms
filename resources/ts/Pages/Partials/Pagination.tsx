import { Pagination as CustomPagination } from '@/Components/Pagination'
import { PaginationProps } from '@/Types'

export function Pagination({ pagination }: PaginationProps) {
  return (
    <CustomPagination>
      <CustomPagination.Left
        to={pagination.to}
        from={pagination.from}
        total={pagination.total}
      />
      <CustomPagination.Right>
        <CustomPagination.Previous href={pagination.prev_page_url} />
        <CustomPagination.Next href={pagination.next_page_url} />
      </CustomPagination.Right>
    </CustomPagination>
  )
}
