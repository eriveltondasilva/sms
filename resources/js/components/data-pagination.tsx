import { Link } from '@inertiajs/react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginatorLink {
  url: string | null
  label: string
  active: boolean
}

interface DataPaginationProps {
  links: PaginatorLink[]
  from?: number | null
  to?: number | null
  total?: number
}

export function DataPagination({
  links,
  from,
  to,
  total,
}: DataPaginationProps) {
  if (links.length <= 3) return null

  const prev = links.at(0)
  const next = links.at(-1)
  const pages = links.slice(1, -1)

  return (
    <div className='flex items-center justify-between'>
      {from && to && total && (
        <p className='text-sm text-muted-foreground'>
          {from}–{to} de {total}
        </p>
      )}
      <Pagination className='mx-0 w-auto'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={prev?.url ?? '#'}
              aria-disabled={!prev?.url}
              className={!prev?.url ? 'pointer-events-none opacity-50' : ''}
              // O shadcn usa <a>, precisamos de Link do Inertia:
            >
              <Link href={prev?.url ?? '#'} />
            </PaginationPrevious>
          </PaginationItem>

          {pages.map((page, i) =>
            page.label === '...' ?
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            : <PaginationItem key={i}>
                <PaginationLink isActive={page.active}>
                  {!page.active && page.url ?
                    <Link href={page.url}>{page.label}</Link>
                  : page.label}
                </PaginationLink>
              </PaginationItem>,
          )}

          <PaginationItem>
            <PaginationNext href={next?.url ?? '#'} /* idem */ />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
