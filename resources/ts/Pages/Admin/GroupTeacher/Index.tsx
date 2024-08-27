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
import { formatId } from '@/Utils/formatId'

import type { Group, PageProps, Teacher } from '@/Types'
import { breadcrumbs, titles } from './data'

type PageGroupTeacherIndexProps = {
  group: Group
  teachers: Teacher[]
}

export default function PageGroupTeacherIndex({
  group,
  teachers,
  flash,
}: PageProps<PageGroupTeacherIndexProps>) {
  const title = `${titles.index} - ${group.name}`
  const hasTeachers = teachers.length > 0

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      {!!flash.message && (
        <Alert color='failure' onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.groups.teachers.create', { group })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {/* Exibe mensagem se não houver professores */}
      {!hasTeachers && (
        <NotFound>
          Nenhum professor encontrado para a turma&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {/* Tabela de professores */}
      {hasTeachers && <TeacherTable group={group} teachers={teachers} />}
    </AuthLayout>
  )
}

function TeacherTable({ group, teachers }: PageGroupTeacherIndexProps) {
  const message = 'Tem certeza que deseja remover professor?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.groups.teachers.destroy',
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
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {teachers.map((teacher, index) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-medium'>
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
            <Table.RowCell>{teacher.email}</Table.RowCell>
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
                  onClick={() => handleDeleteAction({ group, teacher })}
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
