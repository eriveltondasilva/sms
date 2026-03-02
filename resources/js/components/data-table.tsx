import { SearchXIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { Icon } from './icon'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from './ui/empty'
import { Skeleton } from './ui/skeleton'

import type { DataTableColumn } from '@/types'
import type { ReactNode } from 'react'

interface DataTableProps<T> {
  title?: string
  description?: string
  caption?: string

  items: T[]
  isLoading?: boolean

  empty?: string
  emptyAction?: ReactNode

  columns: DataTableColumn<T>[]

  actions?: (row: T) => ReactNode
}

export function DataTable<T>({
  title,
  description,
  caption,
  items,
  isLoading,
  empty,
  emptyAction,
  columns,
  actions,
}: DataTableProps<T>) {
  const hasItems = items.length > 0

  return (
    <Card>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      {/* --- */}
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}

            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn(column.className, column.headerClassName)}
                  >
                    {column.header}
                  </TableHead>
                ))}

                {!!actions && (
                  <TableHead className='w-16 text-center'>Ações</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* --- */}
              {hasItems &&
                !isLoading &&
                items.map((row, rowIndex) => (
                  <TableRow key={'row-' + rowIndex}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={'cell-' + colIndex}
                        className={cn(column.className, column.cellClassName)}
                      >
                        {column.renderCell(row)}
                      </TableCell>
                    ))}

                    {!!actions && (
                      <TableCell className='text-center'>
                        {actions(row)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}

              {/* --- */}
              {hasItems &&
                isLoading &&
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`}>
                    {columns.map((_, colIdx) => (
                      <TableCell key={`skeleton-cell-${colIdx}`}>
                        <Skeleton className='h-4 w-full' />
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell>
                        <Skeleton className='mx-auto h-4 w-8' />
                      </TableCell>
                    )}
                  </TableRow>
                ))}

              {/* --- */}
              {!hasItems && (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant='icon' className='size-12'>
                          <Icon iconNode={SearchXIcon} className='size-8' />
                        </EmptyMedia>

                        <EmptyDescription>
                          {empty || 'Nenhum registro encontrado.'}
                        </EmptyDescription>
                      </EmptyHeader>

                      {emptyAction && (
                        <EmptyContent>{emptyAction}</EmptyContent>
                      )}
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
