import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Check, Eye, Plus, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { Table } from '@/Components/Table'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'
import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import type { Group, PageProps, Student } from '@/Types'
import { breadcrumbs, titles } from './data'

type PageGroupStudentIndexProps = {
  group: Group
  students: Student[]
}

export default function PageGroupStudentIndex({
  group,
  students,
  flash,
}: PageProps<PageGroupStudentIndexProps>) {
  const title = `${titles.index} - ${group.name}`
  const hasStudents = students.length > 0

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      {!!flash.message && (
        <Alert color='failure' icon={Check} onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.groups.students.create', { group })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar alunos
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {/* Exibe mensagem se não houver alunos */}
      {!hasStudents && (
        <NotFound>
          Nenhum aluno encontrado na turma do&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {/* Tabela de alunos */}
      {hasStudents && <StudentTable group={group} students={students} />}
    </AuthLayout>
  )
}

function StudentTable({ group, students }: PageGroupStudentIndexProps) {
  const message = 'Tem certeza que deseja remover o aluno?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.groups.students.destroy',
    options: {
      onBefore: () => confirm(message),
    },
  })

  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0'>##</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Matrícula</Table.HeaderCell>
        <Table.HeaderCell>Gênero</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
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
                  onClick={() => handleDeleteAction({ group, student })}
                  disabled={isLoading}
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
