import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine, Plus, Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import Input from '@/Components/Input'
import Pagination from '@/Components/Pagination'
import Searchbar from '@/Components/Searchbar'
import Table from '@/Components/Table'
import Title from '@/Components/Title'

import AuthLayout from '@/Layouts/AuthLayout'

import useFormHandler from '@/Hooks/useFormHandler'
import formatId from '@/Utils/formatId'
import getGenderName from '@/Utils/getGenderName'

import StudentNotFound from './Partials/StudentNotFound'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageStudentIndex({ students = [] }) {
  const paramsSearch = route().params.search || ''
  const [search, setSearch] = useState(paramsSearch)

  const hasStudents = students.data.length > 0
  const hasPagination = students.total > students.data.length

  const handleChange = (e) => setSearch(e.target.value)

  const formOptions = { method: 'GET', route: 'admin.students.index' }
  const { handleSubmit, isLoading } = useFormHandler(formOptions)

  return (
    <>
      {/* Título */}
      <Title>
        <Title.Left title={titles.index} />
        <Title.Right>
          <Button as={Link} href={route('admin.students.create')} color='blue'>
            <Plus className='mr-2 h-5 w-5' />
            Cadastrar Aluno
          </Button>
        </Title.Right>
        {/* TODO: implementar PDF */}
      </Title>

      {/* Student Searchbar */}
      <Searchbar onSubmit={handleSubmit}>
        <Searchbar.Left>
          <Input.Text
            id='search'
            type='search'
            className='mb-0'
            placeholder='Nome ou ID do aluno...'
            defaultValue={search}
            onChange={handleChange}
            autoFocus
          />
          <Button.Group>
            <Button type='submit' color='blue' disabled={isLoading || !search}>
              <Search className='mr-2 h-5 w-5' />
              Pesquisar
            </Button>
            <Button
              as={Link}
              href={route('admin.students.index')}
              color='light'
              disabled={isLoading}>
              <Undo2 className='h-5 w-5' />
            </Button>
          </Button.Group>
        </Searchbar.Left>
      </Searchbar>

      {/* Student Not Found */}
      {!hasStudents && <StudentNotFound />}

      {/* Student Table */}
      {hasStudents && <StudentTable students={students.data} />}

      {/* Student Pagination */}
      {hasPagination && <StudentPagination {...{ students }} />}
    </>
  )
}

// ----------------------------------------------
function StudentTable({ students = [] }) {
  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'>ID</Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Gênero</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {students.map((student) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='font-bold'>
              {formatId(student.id)}
            </Table.RowCell>
            <Table.RowCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              {student.name}
            </Table.RowCell>
            <Table.RowCell>{getGenderName(student.gender)}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('admin.students.show', { student })}
                  color='blue'
                  title='Visualizar aluno'
                  size='xs'>
                  <Eye className='h-4 w-4' />
                </Button>
                <Button
                  as={Link}
                  href={route('admin.students.edit', { student })}
                  color='green'
                  title='Editar aluno'
                  size='xs'>
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

// ----------------------------------------------
function StudentPagination({ students = {} }) {
  const { total, from, to, next_page_url, prev_page_url } = students

  return (
    <Pagination>
      <Pagination.Left to={to} from={from} total={total} />
      <Pagination.Right>
        <Pagination.Previous href={prev_page_url} />
        <Pagination.Next href={next_page_url} />
      </Pagination.Right>
    </Pagination>
  )
}

// ==============================================
PageStudentIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
