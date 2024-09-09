import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Table } from '@/Components/Table'

import { formatId } from '@/Utils/formatId'

import type { TeacherTableProps } from '../types'

export function GroupTeacherTable({
  group,
  teachers,
  onClick,
  disabled,
}: TeacherTableProps) {
  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0'>##</Table.HeaderCell>
        <Table.HeaderCell>nome</Table.HeaderCell>
        <Table.HeaderCell>email</Table.HeaderCell>
        <Table.HeaderCell>ações</Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {teachers.map((teacher, index) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-medium'>
              {formatId(index + 1)}
            </Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white',
              )}
            >
              {teacher.name}
            </Table.RowCell>
            <Table.RowCell>{teacher.email}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.teachers.show', { teacher })}
                  disabled={disabled}
                  color='blue'
                  size='xs'
                >
                  <Tooltip content='Visualizar Professor'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='failure'
                  onClick={() => onClick({ group, teacher })}
                  disabled={disabled}
                  size='xs'
                >
                  <Tooltip content='Remover Professor'>
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
