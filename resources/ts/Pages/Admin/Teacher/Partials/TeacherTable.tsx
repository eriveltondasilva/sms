import { Table } from '@/Components/Table'
import { formatId } from '@/Utils/formatId'

import type { TeacherTableProps } from '../types'

export function TeacherTable({ teachers }: TeacherTableProps) {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          email
        </Table.HeaderCell>
        <Table.HeaderCell className='flex justify-center'>
          ações
        </Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {teachers.map((teacher) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-bold'>
              {formatId(teacher.id)}
            </Table.RowCell>
            <Table.RowCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {teacher.name}
            </Table.RowCell>
            <Table.RowCell className='hidden sm:table-cell'>
              {teacher.email}
            </Table.RowCell>
            <Table.RowCell className='flex justify-center'>
              <Table.Link href={route('admin.teachers.show', { teacher })}>
                ver
              </Table.Link>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
