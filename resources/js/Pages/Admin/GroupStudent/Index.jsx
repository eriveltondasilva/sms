import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Check, Eye, Plus, Trash2 } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { PageHeader } from '@/Components/PageHeader'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import { breadcrumbs, titles } from './data'
import StudentNotFound from './Partials/StudentNotFound'

//
export default function PageGroupStudentIndex({ data, flash }) {
  const { group = {}, students = [] } = data

  const title = `${titles.index} - ${group.name}`
  const hasStudents = students.length > 0

  return (
    <>
      {!!flash.message && (
        <Alert
          color='failure'
          icon={Check}
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.groups.students.create', { group })}>
          <Plus className='mr-1 size-5' />
          Adicionar alunos
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <br />

      {/* Exibe mensagem se não houver alunos */}
      {!hasStudents && <StudentNotFound />}

      {/* Tabela de alunos */}
      {hasStudents && <StudentTable {...{ group, students }} />}
    </>
  )
}

function StudentTable({ group = {}, students = [] }) {
  const message = 'Tem certeza que deseja remover o aluno(a)?'

  const actionOptions = {
    method: 'DELETE',
    route: 'admin.groups.students.destroy',
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
                'text-gray-900 dark:text-white'
              )}>
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
                  size='xs'>
                  <Tooltip content='Visualizar Aluno(a)'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='failure'
                  onClick={() => handleDeleteAction({ group, student })}
                  disabled={isLoading}
                  size='xs'>
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

//
PageGroupStudentIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
