import { Table } from 'flowbite-react'

// ====================================
export function TableRoot({ children }) {
  return (
    <div className='overflow-x-auto shadow-md'>
      <Table hoverable>{children}</Table>
    </div>
  )
}

// ====================================
export function TableHeader({ children }) {
  return <Table.Head>{children}</Table.Head>
}

// ====================================
export function TableHeaderCell({ children, ...props }) {
  return <Table.HeadCell {...props}>{children}</Table.HeadCell>
}

// ====================================
export function TableBody({ children }) {
  return <Table.Body className='divide-y'>{children}</Table.Body>
}

// ====================================
export function TableRow({ children }) {
  return (
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      {children}
    </Table.Row>
  )
}

export function TableRowCell({ children, ...props }) {
  return <Table.Cell {...props}>{children}</Table.Cell>
}
