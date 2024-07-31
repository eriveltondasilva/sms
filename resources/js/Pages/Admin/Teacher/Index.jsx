import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine, Plus, Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { Pagination } from '@/Components/Pagination'
import { SearchFilter } from '@/Components/SearchFilter'
import { Table } from '@/Components/Table'
import { Title } from '@/Components/Title'

import AuthLayout from '@/Layouts/AuthLayout'

import useFormHandler from '@/Hooks/useFormHandler'
import { formatId } from '@/Utils/formatId'

import TeacherNotFound from './Partials/TeacherNotFound'
import { breadcrumbs, titles } from './data'

//
export default function PageTeacherIndex({ teachers = [] }) {
  const paramsSearch = route().params.search || ''
  const [search, setSearch] = useState(paramsSearch)

  const hasTeachers = teachers.data.length > 0
  const hasPagination = teachers.total > teachers.data.length

  const formOptions = { method: 'GET', route: 'admin.teachers.index' }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <>
      {/* Título */}
      <Title>
        <Title.Left title={titles.index} />
        <Title.Right>
          <Button
            as={Link}
            href={route('admin.teachers.create')}
            color='blue'
            size='sm'
          >
            <Plus className='mr-1 size-5' />
            Cadastrar Professor
          </Button>
        </Title.Right>
        {/* TODO: implementar PDF */}
      </Title>

      {/* Teacher SearchFilter */}
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
              disabled={isLoading || !search}
            >
              <Search className='mr-2 size-5' />
            </Button>
            <Button
              as={Link}
              href={route('admin.teachers.index')}
              color='light'
              disabled={isLoading}
            >
              <Undo2 className='size-5' />
            </Button>
          </Button.Group>
        </SearchFilter.Left>
      </SearchFilter>

      {/* Teacher NotFound */}
      {!hasTeachers && <TeacherNotFound />}

      {/* Teacher Table */}
      {hasTeachers && <TeacherTable teachers={teachers.data} />}

      {/* Pagination */}
      {hasPagination && <TeacherPagination teachers={teachers} />}
    </>
  )
}

function TeacherTable({ teachers = [] }) {
  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell className='hidden sm:table-cell'>
          Email
        </Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
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
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.teachers.show', { teacher })}
                  color='blue'
                  title='Visualizar professor'
                  size='xs'
                >
                  <Eye className='h-4 w-4' />
                </Button>
                <Button
                  as={Link}
                  href={route('admin.teachers.edit', { teacher })}
                  color='green'
                  title='Editar professor'
                  size='xs'
                >
                  <PencilLine className='mx-1 h-4 w-4' />
                </Button>
              </Button.Group>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function TeacherPagination({ teachers = {} }) {
  const { total, from, to, next_page_url, prev_page_url } = teachers

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
PageTeacherIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
