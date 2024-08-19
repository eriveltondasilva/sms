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
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'
import TeacherNotFound from './Partials/TeacherNotFound'

export default function PageTeacherIndex({ teachers, totalTeachers }) {
  const { search: paramsSearch } = route().params
  const [search, setSearch] = useState(paramsSearch || '')

  console.log(route().params.search || '')

  const formOptions = { route: 'admin.teachers.index' }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.teachers.create')}>
          <Plus className='mr-1 size-5' />
          Novo Professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <SearchBar onSubmit={handleSubmit}>
        <SearchBar.Left>
          <Input.Text
            id='search'
            type='search'
            placeholder='Nome ou ID do professor...'
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete='off'
            autoFocus
          />
          <Button.Group>
            <Button
              type='submit'
              color='blue'
              disabled={isLoading}>
              <Search className='mr-1 size-5' />
              Pesquisar
            </Button>
            <Button
              as={Link}
              href={route('admin.teachers.index')}
              color='light'
              disabled={isLoading}>
              <Undo2 className='size-5' />
            </Button>
          </Button.Group>
        </SearchBar.Left>
      </SearchBar>

      <TeacherNotFound totalTeachers={totalTeachers} />

      <TeacherTable teachers={teachers.data} />

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
