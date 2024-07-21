import { Table as FlowbiteTable } from 'flowbite-react'

//
function TableRoot({ children }) {
  return (
    <div className='overflow-x-auto shadow-md'>
      <FlowbiteTable hoverable>{children}</FlowbiteTable>
    </div>
  )
}

function TableHeader({ children }) {
  return <FlowbiteTable.Head>{children}</FlowbiteTable.Head>
}

function TableHeaderCell({ children, ...props }) {
  return <FlowbiteTable.HeadCell {...props}>{children}</FlowbiteTable.HeadCell>
}

function TableBody({ children }) {
  return (
    <FlowbiteTable.Body className='divide-y'>{children}</FlowbiteTable.Body>
  )
}

function TableRow({ children }) {
  return (
    <FlowbiteTable.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      {children}
    </FlowbiteTable.Row>
  )
}

function TableRowCell({ children, ...props }) {
  return <FlowbiteTable.Cell {...props}>{children}</FlowbiteTable.Cell>
}

//
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  HeaderCell: TableHeaderCell,
  Body: TableBody,
  Row: TableRow,
  RowCell: TableRowCell,
})
