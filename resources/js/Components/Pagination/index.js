import {
  PaginationLeft,
  PaginationNext,
  PaginationPrevious,
  PaginationRight,
  PaginationRoot,
} from './Pagination'

const Pagination = PaginationRoot

Pagination.Next = PaginationNext
Pagination.Previous = PaginationPrevious
Pagination.Left = PaginationLeft
Pagination.Right = PaginationRight

export default Pagination
