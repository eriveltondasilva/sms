import { type InertiaLinkProps, Link } from '@inertiajs/react'
import { Table as FlowbiteTable } from 'flowbite-react'
import { twJoin } from 'tailwind-merge'

function TableRoot({ children }: React.PropsWithChildren) {
  return (
    <div className='overflow-x-auto shadow-md'>
      <FlowbiteTable>{children}</FlowbiteTable>
    </div>
  )
}

function TableBody({ children }: React.PropsWithChildren) {
  return (
    <FlowbiteTable.Body className='divide-y'>{children}</FlowbiteTable.Body>
  )
}

function TableRow({ children }: React.PropsWithChildren) {
  return (
    <FlowbiteTable.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      {children}
    </FlowbiteTable.Row>
  )
}

function TableLink({
  children,
  ...props
}: React.PropsWithChildren<InertiaLinkProps>) {
  return (
    <Link
      className={twJoin(
        'font-medium underline',
        'hover:font-extrabold hover:no-underline',
        'text-blue-600 dark:text-blue-500',
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Link: TableLink,
  Row: TableRow,
  Header: FlowbiteTable.Head,
  HeaderCell: FlowbiteTable.HeadCell,
  RowCell: FlowbiteTable.Cell,
})
