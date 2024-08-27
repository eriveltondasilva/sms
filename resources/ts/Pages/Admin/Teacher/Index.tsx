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
import type { Teacher, TeacherPagination } from '@/Types'
import { formatId } from '@/Utils/formatId'

import { NotFound } from '@/Components/NotFound'
import { breadcrumbs, titles } from './data'

type PageTeacherIndexProps = {
  teacherPagination: TeacherPagination
}

export default function PageTeacherIndex({
  teacherPagination,
}: PageTeacherIndexProps) {
  const { search: paramsSearch } = route().params
  const [search, setSearch] = useState(paramsSearch || '')

  const hasTeachers = teacherPagination.data.length > 0

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.teachers.index',
  })

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
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
            <Button type='submit' color='blue' disabled={isLoading}>
              <Search className='mr-1 size-5' />
              Pesquisar
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
        </SearchBar.Left>
      </SearchBar>

      {!hasTeachers && (
        <NotFound>Não foi encontrado nenhum professor.</NotFound>
      )}

      {hasTeachers && <TeacherTable teachers={teacherPagination.data} />}

      <TeacherPagination pagination={teacherPagination} />
    </AuthLayout>
  )
}

function TeacherTable({ teachers }: { teachers: Teacher[] }) {
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

function TeacherPagination({ pagination }: { pagination: TeacherPagination }) {
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
