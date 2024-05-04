import { Link, usePage } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Plus, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import Alert from '@/Components/Alert'
import Table from '@/Components/Table'
import Title from '@/Components/Title'

import useActionHandler from '@/Hooks/useActionHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import TeacherNotFound from './Partials/TeacherNotFound'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageGroupTeacherIndex({ group = {}, teachers = [] }) {
  const { message } = usePage().props.flash || {}

  const pageTitle = `${titles.index} - ${group.name}`
  const hasTeachers = teachers.length > 0

  return (
    <>
      {/* Mensagem flash */}
      {message && (
        <Alert color='failure' className='mb-4'>
          {message}
        </Alert>
      )}

      {/* Título */}
      <Title>
        <Title.Left title={pageTitle} />
        <Title.Right>
          <Button
            as={Link}
            href={route('admin.groups.teachers.create', { group })}
            color='blue'>
            <Plus className='mr-2 h-5 w-5' />
            Adicionar professor
          </Button>
        </Title.Right>
        {/* TODO: implementar PDF */}
      </Title>

      <br />

      {/* Exibe mensagem se não houver professores */}
      {!hasTeachers && <TeacherNotFound />}

      {/* Tabela de professores */}
      {hasTeachers && <TeacherTable {...{ group, teachers }} />}
    </>
  )
}

// ----------------------------------------------
function TeacherTable({ group = {}, teachers = [] }) {
  const message = 'Tem certeza que deseja remover professor(a)?'

  const actionOptions = {
    method: 'DELETE',
    route: 'admin.groups.teachers.destroy',
    options: {
      onBefore: () => confirm(message),
    },
  }
  const { isLoading, handleAction: handleDeleteAction } =
    useActionHandler(actionOptions)

  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0'></Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {teachers.map((teacher, index) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-medium'>{++index}</Table.RowCell>
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
                  color='blue'
                  size='xs'>
                  <Tooltip content='Visualizar Professor(a)'>
                    <Eye className='h-4 w-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='failure'
                  onClick={() => handleDeleteAction({ group, teacher })}
                  disabled={isLoading}
                  size='xs'>
                  <Tooltip content='Remover Professor(a)'>
                    <Trash2 className='mx-1 h-4 w-4' />
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

// ==============================================
PageGroupTeacherIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
