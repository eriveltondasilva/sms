import { Link } from '@inertiajs/react'
import { Button, Tooltip } from 'flowbite-react'
import { Check, Eye, Plus, Search } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Alert } from '@/Components/Alert'
import { Input } from '@/Components/Input'
import { Pagination } from '@/Components/Pagination'
import { SearchFilter } from '@/Components/SearchFilter'
import { Table } from '@/Components/Table'
import { Title } from '@/Components/Title'

import AuthLayout from '@/Layouts/AuthLayout'

import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { useFormHandler } from '@/Hooks/useFormHandler'

import StudentNotFound from './Partials/StudentNotFound'
import { breadcrumbs, titles } from './data'

export default function PageGroupStudentCreate({ data, flash }) {
  const { group = {}, students = [] } = data
  const searchId = route().params.search || ''

  const pageTitle = `${titles.create} - ${group.name}`

  const hasStudents = students.data.length > 0
  const hasPagination = students.total > students.data.length

  const formOptions = {
    route: 'admin.groups.students.create',
    params: { group },
  }
  const { handleSubmit: handleSearchStudent, isLoading } =
    useFormHandler(formOptions)

  return (
    <>
      {/* Mensagem flash */}
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss
        >
          {flash.message}
        </Alert>
      )}

      {/* Título */}
      <Title>
        <Title.Left title={pageTitle} />
      </Title>

      {/* Barra de pesquisa */}
      <SearchFilter onSubmit={handleSearchStudent}>
        <SearchFilter.Left>
          <Input.Text
            id='search'
            type='search'
            className='mb-0'
            defaultValue={searchId}
            placeholder='Pesquisar aluno...'
            autoFocus
          />
          <Button
            type='submit'
            color='blue'
            disabled={isLoading}
          >
            <Search className='size-5' />
          </Button>
        </SearchFilter.Left>
      </SearchFilter>

      {/* Verificar se o aluno não foi encontrado */}
      {!hasStudents && <StudentNotFound />}

      {/* Formulário do aluno */}
      {hasStudents && (
        <StudentTable
          group={group}
          students={students.data}
        />
      )}

      {/* Pagination */}
      {hasPagination && <StudentPagination students={students} />}
    </>
  )
}

function StudentTable({ group = {}, students = [] }) {
  const message = 'Tem certeza que deseja adicionar o aluno(a)?'

  const actionOptions = {
    method: 'POST',
    route: 'admin.groups.students.store',
    options: {
      onBefore: () => confirm(message),
    },
  }
  const { isLoading, handleAction: handleStoreAction } =
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
            <Table.RowCell className='font-bold'>
              {formatId(++index)}
            </Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white'
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
                    <Eye className='h-4 w-4' />
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

function StudentPagination({ students = {} }) {
  const { total, from, to, next_page_url, prev_page_url } = students

  return (
    <Pagination>
      <Pagination.Left
        to={to}
        from={from}
        total={total}
      />
      <Pagination.Right>
        <Pagination.Previous href={prev_page_url} />
        <Pagination.Next href={next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}

//
PageGroupStudentCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
