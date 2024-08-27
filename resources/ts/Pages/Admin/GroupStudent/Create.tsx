import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Check, Eye, Plus, Search } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { Input } from '@/Components/Input'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { Pagination } from '@/Components/Pagination'
import { SearchBar } from '@/Components/SearchBar'
import { Table } from '@/Components/Table'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { useFormHandler } from '@/Hooks/useFormHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'
import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import type { Group, PageProps, Student, StudentPagination } from '@/Types'

import { breadcrumbs, titles } from './data'

type PageGroupStudentCreateProps = {
  group: Group
  studentPagination: StudentPagination
}

export default function PageGroupStudentCreate({
  group,
  studentPagination,
  flash,
}: PageProps<PageGroupStudentCreateProps>) {
  const searchId = route().params.search

  const title = `${titles.create} - ${group.name}`

  const hasStudents = studentPagination.data.length > 0
  const hasPagination = studentPagination.total > studentPagination.data.length

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.groups.students.create',
    params: { group },
  })

  return (
    <AuthLayout title={titles.create} breadcrumb={breadcrumbs.create}>
      {!!flash?.message && (
        <Alert color='success' icon={Check} onDismiss>
          {flash?.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {/* Barra de pesquisa */}
      <SearchBar onSubmit={handleSubmit}>
        <SearchBar.Left>
          <Input.Text
            id='search'
            type='search'
            defaultValue={searchId}
            placeholder='Pesquisar aluno...'
            autoFocus
          />
          <Button type='submit' color='blue' disabled={isLoading}>
            <Search className='size-5' />
          </Button>
        </SearchBar.Left>
      </SearchBar>

      {/* Verificar se o aluno não foi encontrado */}
      {!hasStudents && (
        <NotFound>
          Nenhum aluno encontrado para a turma do&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {/* Formulário do aluno */}
      {hasStudents && (
        <StudentTable group={group} students={studentPagination.data} />
      )}

      {/* Pagination */}
      {hasPagination && <StudentPagination pagination={studentPagination} />}
    </AuthLayout>
  )
}

type StudentTableProps = {
  group: Group
  students: Student[]
}

function StudentTable({ group, students }: StudentTableProps) {
  const message = 'Tem certeza que deseja adicionar o aluno?'

  const { isLoading, handleAction: handleStoreAction } = useActionHandler({
    method: 'post',
    route: 'admin.groups.students.store',
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
            <Table.RowCell className='font-bold'>
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
                  color='green'
                  size='xs'
                >
                  <Tooltip content='Visualizar Aluno'>
                    <Eye className='size-4' />
                  </Tooltip>
                </Button>
                <Button
                  as='button'
                  color='blue'
                  onClick={() => handleStoreAction({ group, student })}
                  disabled={isLoading}
                  size='xs'
                >
                  <Tooltip content='Adicionar Aluno'>
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

function StudentPagination({ pagination }: { pagination: StudentPagination }) {
  return (
    <Pagination>
      <Pagination.Left
        to={pagination.to}
        from={pagination.from}
        total={pagination.total}
      />
      <Pagination.Right>
        <Pagination.Previous href={pagination.prev_page_url} />
        <Pagination.Next href={pagination.next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}
