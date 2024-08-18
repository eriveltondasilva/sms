import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { PageHeader } from '@/Components/PageHeader'
import { Pagination } from '@/Components/Pagination'
import { SearchFilter } from '@/Components/SearchFilter'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'
import TeacherNotFound from './Partials/TeacherNotFound'

export default function PageTeacherIndex({ teachers = [], totalTeachers = 0 }) {
  const paramsSearch = route().params.search || ''
  const [search, setSearch] = useState(paramsSearch)

  const formOptions = { route: 'admin.teachers.index' }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.teachers.create')}>
          Novo Professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <SearchFilter onSubmit={handleSubmit}>
        <SearchFilter.Left>
          <Input.Text
            id='search'
            type='search'
            className='mb-0'
            placeholder='Nome ou ID do professor...'
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
              href={route('admin.teachers.index')}
              color='light'
              disabled={isLoading}>
              <Undo2 className='size-5' />
            </Button>
          </Button.Group>
        </SearchFilter.Left>
      </SearchFilter>

      {/* Teacher NotFound */}
      <TeacherNotFound totalTeachers={totalTeachers} />

      {/* Teacher Table */}
      <TeacherTable teachers={teachers.data} />

      {/* Pagination */}
      <TeacherPagination
        teachers={teachers}
        totalTeachers={totalTeachers}
      />
    </>
  )
}

function TeacherTable({ teachers }) {
  if (teachers.length === 0) return null

  return (
    <Table>
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          Email
        </Table.HeaderCell>
        <Table.HeaderCell className='flex justify-end'>Ação</Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {teachers.map((teacher) => (
          <Table.Row key={teacher.id}>
            <Table.RowCell className='font-bold'>
              {formatId(teacher.id)}
            </Table.RowCell>
            <Table.RowCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {teacher.name}
            </Table.RowCell>
            <Table.RowCell className='hidden sm:table-cell'>
              {teacher.email}
            </Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Table.Link href={route('admin.teachers.show', { teacher })}>
                ver
              </Table.Link>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function TeacherPagination({ teachers, totalTeachers }) {
  if (totalTeachers <= teachers.data.length) return null

  return (
    <Pagination>
      <Pagination.Left
        to={teachers.to}
        from={teachers.from}
        total={totalTeachers}
      />
      <Pagination.Right>
        <Pagination.Previous href={teachers.prev_page_url} />
        <Pagination.Next href={teachers.next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}

//
PageTeacherIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
