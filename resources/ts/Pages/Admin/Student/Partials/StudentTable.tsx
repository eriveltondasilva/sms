import { Table } from '@/Components/Table'

import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import type { StudentTableProps } from '../types'

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          gênero
        </Table.HeaderCell>
        <Table.HeaderCell className='flex justify-center'>
          ações
        </Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {students.map((student) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='w-0 font-bold'>
              {formatId(student.id)}
            </Table.RowCell>
            <Table.RowCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {student.name}
            </Table.RowCell>
            <Table.RowCell className='hidden sm:table-cell'>
              {getGenderName(student.gender)}
            </Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Table.Link href={route('admin.students.show', { student })}>
                Ver
              </Table.Link>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
