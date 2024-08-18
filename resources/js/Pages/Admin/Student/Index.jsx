import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Plus, Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { PageHeader } from '@/Components/PageHeader'
import { Pagination } from '@/Components/Pagination'
import { SearchFilter } from '@/Components/SearchFilter'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { formatId } from '@/Utils/formatId'
import { getGenderName } from '@/Utils/getGenderName'

import { breadcrumbs, titles } from './data'
import StudentNotFound from './Partials/StudentNotFound'

export default function PageStudentIndex({ students = [], totalStudents = 0 }) {
  const paramsSearch = route().params.search || ''
  const [search, setSearch] = useState(paramsSearch)

  const hasStudents = totalStudents > 0
  const hasPagination = totalStudents > students.data.length

  const formOptions = { route: 'admin.students.index' }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.students.create')}>
          <Plus className='mr-1 size-5' />
          Novo Aluno
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {/* Student SearchFilter */}
      <SearchFilter onSubmit={handleSubmit}>
        <SearchFilter.Left>
          <Input.Text
            id='search'
            type='search'
            className='mb-0'
            placeholder='Nome ou ID do aluno...'
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button.Group>
            <Button
              type='submit'
              color='blue'
              disabled={isLoading || !search}>
              <Search className='mr-2 size-5' />
            </Button>
            <Button
              as={Link}
              href={route('admin.students.index')}
              color='light'
              disabled={isLoading}>
              <Undo2 className='size-5' />
            </Button>
          </Button.Group>
        </SearchFilter.Left>
      </SearchFilter>

      {/* Student Not Found */}
      <StudentNotFound totalStudents={totalStudents} />

      {/* Student Table */}
      <StudentTable students={students.data} />

      {/* Student Pagination */}
      <StudentPagination
        students={students}
        totalStudents={totalStudents}
      />
    </>
  )
}

function StudentTable({ students }) {
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

function StudentPagination({ students, totalStudents }) {
  if (totalStudents <= students.data.length) return null

  return (
    <Pagination>
      <Pagination.Left
        to={students.to}
        from={students.from}
        total={totalStudents}
      />
      <Pagination.Right>
        <Pagination.Previous href={students.prev_page_url} />
        <Pagination.Next href={students.next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}

PageStudentIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
