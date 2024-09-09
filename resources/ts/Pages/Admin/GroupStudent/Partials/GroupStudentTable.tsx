import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Table } from '@/Components/Table'

import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import type { GroupStudentTableProps } from '../types'

export function GroupStudentTable({
  group,
  students,
  disabled,
  onClick,
}: GroupStudentTableProps) {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0'>##</Table.HeaderCell>
        <Table.HeaderCell>nome</Table.HeaderCell>
        <Table.HeaderCell>matrícula</Table.HeaderCell>
        <Table.HeaderCell>gênero</Table.HeaderCell>
        <Table.HeaderCell>ações</Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {students.map((student, index) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='font-medium'>
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
            <Table.RowCell>{formatId(student.id, { pad: 4 })}</Table.RowCell>
            <Table.RowCell>{getGenderName(student.gender)}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.students.show', { student })}
                  color='blue'
                  size='xs'
                >
                  <Tooltip content='Visualizar Aluno(a)'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='failure'
                  onClick={() => onClick({ group, student })}
                  disabled={disabled}
                  size='xs'
                >
                  <Tooltip content='Remover Aluno(a)'>
                    <Trash2 className='mx-1 size-4' />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
