import { Link, usePage } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Eye, Plus } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import Alert from '@/Components/Alert'
import Table from '@/Components/Table'
import Title from '@/Components/Title'

import useActionHandler from '@/Hooks/useActionHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import TeacherNotFound from './Partials/TeacherNotFound'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageSubjectTeacherCreate({
  subject = {},
  teachers = [],
}) {
  const { message } = usePage().props.flash || {}

  const pageTitle = `${titles.create} - ${subject.name}`
  const hasTeachers = teachers.length > 0

  return (
    <>
      {/* Mensagem flash */}
      {message && (
        <Alert color='success' className='mb-4'>
          {message}
        </Alert>
      )}

      {/* Título */}
      <Title>
        <Title.Left title={pageTitle} />
      </Title>

      {/* Verificar se o professor não foi encontrado */}
      {!hasTeachers && <TeacherNotFound />}

      {/* Formulário do professor */}
      {hasTeachers && <TeacherTable {...{ subject, teachers }} />}
    </>
  )
}

// ----------------------------------------------
function TeacherTable({ subject = {}, teachers = [] }) {
  const actionOptions = {
    method: 'POST',
    route: 'admin.subjects.teachers.store',
  }
  const { isLoading, handleAction: handleStoreAction } =
    useActionHandler(actionOptions)

  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0'></Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>CPF</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {teachers.map((teacher, index) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-bold'>{++index}</Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white'
              )}>
              {teacher.name}
            </Table.RowCell>
            <Table.RowCell>{teacher.cpf}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.teachers.show', { teacher })}
                  color='green'
                  size='xs'>
                  <Tooltip content='Visualizar Professor'>
                    <Eye className='h-4 w-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='blue'
                  onClick={() => handleStoreAction({ subject, teacher })}
                  disabled={isLoading}
                  size='xs'>
                  <Tooltip content='Adicionar Professor'>
                    <Plus className='mx-1 h-4 w-4' />
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
PageSubjectTeacherCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
