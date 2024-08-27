import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Plus, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'
import type { PageProps, Subject, Teacher } from '@/Types'
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'

type PageSubjectTeacherIndexProps = {
  subject: Subject
  teachers: Teacher[]
}

export default function PageSubjectTeacherIndex({
  subject,
  teachers,
  flash,
}: PageProps<PageSubjectTeacherIndexProps>) {
  const title = `${titles.index} - ${subject.name}`
  const hasTeachers = teachers.length > 0

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      {!!flash?.message && (
        <Alert color='failure' onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.subjects.teachers.create', { subject })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {!hasTeachers && (
        <NotFound>Nenhum professor encontrado na disciplina...</NotFound>
      )}

      {hasTeachers && <TableTeacher subject={subject} teachers={teachers} />}
    </AuthLayout>
  )
}

type TableTeacherProps = {
  subject: Subject
  teachers: Teacher[]
}

function TableTeacher({ subject, teachers }: TableTeacherProps) {
  const message = 'Tem certeza que deseja remover professor?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.subjects.teachers.destroy',
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
        <Table.HeaderCell>CPF</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
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
            <Table.RowCell>{teacher.cpf}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.teachers.show', { teacher })}
                  color='blue'
                  size='xs'
                >
                  <Tooltip content='Visualizar Professor(a)'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='failure'
                  onClick={() => handleDeleteAction({ subject, teacher })}
                  disabled={isLoading}
                  size='xs'
                >
                  <Tooltip content='Remover Professor(a)'>
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
