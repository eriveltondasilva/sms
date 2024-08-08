import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Plus } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { PageHeader } from '@/Components/PageHeader'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'
import TeacherNotFound from './Partials/TeacherNotFound'

//
export default function PageGroupTeacherCreate({ data, flash }) {
  const { group = {}, teachers = [] } = data

  const title = `${titles.create} - ${group.name}`
  const hasTeachers = teachers.length > 0

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {/* Verificar se o professor não foi encontrado */}
      {!hasTeachers && <TeacherNotFound />}

      {/* Formulário do professor */}
      {hasTeachers && (
        <TeacherTable
          group={group}
          teachers={teachers}
        />
      )}
    </>
  )
}

function TeacherTable({ group = {}, teachers = [] }) {
  const actionOptions = { method: 'POST', route: 'admin.groups.teachers.store' }
  const { isLoading, handleAction: handleStoreAction } =
    useActionHandler(actionOptions)

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
            <Table.RowCell className='font-bold'>
              {formatId(++index)}
            </Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white'
              )}>
              {teacher.name}
            </Table.RowCell>
            <Table.RowCell>{teacher.email}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.teachers.show', { teacher })}
                  color='green'
                  size='xs'>
                  <Tooltip content='Visualizar Professor'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='blue'
                  onClick={() => handleStoreAction({ group, teacher })}
                  disabled={isLoading}
                  size='xs'>
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

//
PageGroupTeacherCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
