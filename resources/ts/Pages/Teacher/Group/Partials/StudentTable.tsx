import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Table } from '@/Components/Table'
import { formatId } from '@/Utils/formatId'

import type { StudentTableProps } from './types'

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          Matrícula
        </Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {students.map((student, index) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='font-bold'>
              {formatId(++index)}
            </Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white',
              )}
            >
              {student.name}
            </Table.RowCell>
            <Table.RowCell className='hidden sm:table-cell'>
              #{formatId(student.id, { pad: 3 })}
            </Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('test')}
                  color='blue'
                  title='Visualizar professor'
                  size='xs'
                >
                  <Eye className='size-4' />
                </Button>
                <Button
                  as={Link}
                  href={route('test')}
                  color='green'
                  title='Editar professor'
                  size='xs'
                >
                  <PencilLine className='mx-1 size-4' />
                </Button>
              </Button.Group>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
