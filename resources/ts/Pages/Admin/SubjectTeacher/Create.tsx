import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Plus } from 'lucide-react'
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

type PageSubjectTeacherCreateProps = {
  subject: Subject
  teachers: Teacher[]
}

export default function PageSubjectTeacherCreate({
  subject,
  teachers,
  flash,
}: PageProps<PageSubjectTeacherCreateProps>) {
  const title = `${titles.create} - ${subject.name}`
  const hasTeachers = teachers.length > 0

  return (
    <AuthLayout title={titles.create} breadcrumb={breadcrumbs.create}>
      {!!flash.message && (
        <Alert color='success' onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {!hasTeachers && (
        <NotFound>Nenhum professor encontrado na disciplina...</NotFound>
      )}

      {hasTeachers && <TeacherTable subject={subject} teachers={teachers} />}
    </AuthLayout>
  )
}

type TeacherTableProps = {
  subject: Subject
  teachers: Teacher[]
}

function TeacherTable({ subject, teachers }: TeacherTableProps) {
  const { isLoading, handleAction: handleStoreAction } = useActionHandler({
    method: 'post',
    route: 'admin.subjects.teachers.store',
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
            <Table.RowCell className='font-bold'>
              {formatId(++index)}
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
                  color='green'
                  size='xs'
                >
                  <Tooltip content='Visualizar Professor'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='blue'
                  onClick={() => handleStoreAction({ subject, teacher })}
                  disabled={isLoading}
                  size='xs'
                >
                  <Tooltip content='Adicionar Professor'>
                    <Plus className='mx-1 size-4' />
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
