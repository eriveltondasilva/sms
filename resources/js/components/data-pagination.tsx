import { Item, ItemActions, ItemContent, ItemDescription } from './ui/item'
import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'

import type { PaginatedData } from '@/types'

export function DataPagination<T>({ data }: { data: PaginatedData<T> }) {
  const {
    current_page,
    last_page,
    links,
    total,
    from,
    to,
    prev_page_url,
    next_page_url,
  } = data

  if (last_page <= 1) return null

  const pages = links.filter((link) => !isNaN(Number(link.label)))

  return (
    <Item>
      <ItemContent>
        <ItemDescription>
          {from && to ?
            <>
              {from} - {to} de <span className='font-medium'>{total}</span>{' '}
              resultados
            </>
          : <>
              Total: <span className='font-medium'>{total}</span>
            </>
          }
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <PaginationBase>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={prev_page_url || '#'}
                aria-disabled={current_page === 1}
                className={
                  current_page === 1 ? 'pointer-events-none opacity-50' : ''
                }
                preserveState
                preserveScroll
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>

            {pages.map((link, i) => {
              const pageNumber = Number(link.label)
              const isNearCurrent = Math.abs(pageNumber - current_page) <= 1
              const isFirstOrLast = pageNumber === 1 || pageNumber === last_page

              if (!isNearCurrent && !isFirstOrLast) {
                if (pageNumber === 2 || pageNumber === last_page - 1) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
                return null
              }

              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={link.url || '#'}
                    isActive={link.active}
                    preserveScroll
                    preserveState
                  >
                    {link.label}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                href={next_page_url || '#'}
                aria-disabled={current_page === last_page}
                className={
                  current_page === last_page ?
                    'pointer-events-none opacity-50'
                  : ''
                }
                preserveState
                preserveScroll
              >
                Próxima
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </PaginationBase>
      </ItemActions>
    </Item>
  )
}
