import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Plus, Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { PageHeader } from '@/Components/PageHeader'
import { Pagination } from '@/Components/Pagination'
import { SearchBar } from '@/Components/SearchBar'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import type { Student, StudentPagination } from '@/Types'
import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import { NotFound } from '@/Components/NotFound'
import { breadcrumbs, titles } from './data'

type PageStudentIndexProps = {
  studentPagination: StudentPagination
}

export default function PageStudentIndex({
  studentPagination,
}: PageStudentIndexProps) {
  const {
    search: paramsSearch,
    gender: paramsGender,
    perPage: paramsPerPage,
  } = route().params

  const hasStudents = studentPagination.data.length > 0
  const [search, setSearch] = useState(paramsSearch)

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.students.index',
  })

  const genderSelectValues = [
    { id: '', name: 'M/F' },
    { id: 'M', name: 'Masculino' },
    { id: 'F', name: 'Feminino' },
  ]

  const perPageSelectValues = ['', '20', '50']

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.students.create')}>
          <Plus className='mr-1 size-5' />
          Novo Aluno
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <SearchBar onSubmit={handleSubmit}>
        <SearchBar.Left>
          <Input.Text
            id='search'
            type='search'
            placeholder='Nome ou ID do aluno...'
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete='off'
            autoFocus
          />

          <Input.Select
            id='gender'
            defaultValue={paramsGender}
            values={genderSelectValues}
          />

          <Input.Select
            id='perPage'
            defaultValue={paramsPerPage}
            values={perPageSelectValues}
          />
        </SearchBar.Left>

        <SearchBar.Right>
          <Button.Group>
            <Button type='submit' color='blue' disabled={isLoading}>
              <Search className='mr-1 size-5' />
              Pesquisar
            </Button>
            <Button
              as={Link}
              href={route('admin.students.index')}
              color='light'
              disabled={isLoading}
            >
              <Undo2 className='size-5' />
            </Button>
          </Button.Group>
        </SearchBar.Right>
      </SearchBar>

      {!hasStudents && <NotFound>Não foram encontrados alunos...</NotFound>}

      <StudentTable students={studentPagination.data} />

      <StudentPagination pagination={studentPagination} />
    </AuthLayout>
  )
}

type StudentTableProps = {
  students: Student[]
}

function StudentTable({ students }: StudentTableProps) {
  if (students.length === 0) return null

  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          Gênero
        </Table.HeaderCell>
        <Table.HeaderCell className='flex justify-end'>Ação</Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {students.map((student) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='w-0 font-bold'>
              {formatId(student.id)}
            </Table.RowCell>
            <Table.RowCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {student.name}
            </Table.RowCell>
            <Table.RowCell className='hidden sm:table-cell'>
              {getGenderName(student.gender)}
            </Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Table.Link href={route('admin.students.show', { student })}>
                Ver
              </Table.Link>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function StudentPagination({ pagination }: { pagination: StudentPagination }) {
  if (pagination.total <= pagination.data.length) return null

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
