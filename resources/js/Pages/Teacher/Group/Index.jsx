import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine, Search } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Input } from '@/Components/Input'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { SearchFilter } from '@/Components/SearchFilter'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'

//
export default function PageGroupIndex({ data }) {
  const { activeYear, teacherGroups, selectedGroup } = data || {}

  const title = `${titles.index} - ${activeYear.year}`
  const hasGroup = selectedGroup?.students?.length > 0

  const formOptions = { route: 'teacher.groups.index' }
  const { handleSubmit: handleSearch, isLoading } = useFormHandler(formOptions)

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      <SearchFilter onSubmit={handleSearch}>
        <SearchFilter.Left>
          <Input.Select
            id='search'
            className='mb-0'
            defaultValue={selectedGroup?.id}
            values={['', ...teacherGroups]}
          />
          <Button
            type='submit'
            color='blue'
            disabled={isLoading}>
            <Search className='size-5' />
          </Button>
        </SearchFilter.Left>
      </SearchFilter>

      <br />

      {/* Exibe mensagem se não houver grupos */}
      {!hasGroup && <NotFoundGroup />}

      {/* Exibe os cards das turmas */}
      {hasGroup && (
        <StudentTable
          selectedGroup={selectedGroup}
          students={selectedGroup.students}
        />
      )}
    </>
  )
}

//
function StudentTable({ selectedGroup, students = [] }) {
  return (
    <>
      <h3 className='mb-3 text-lg'>
        # Turma selecionada: {selectedGroup?.name} (
        {selectedGroup?.school_year_id})
      </h3>

      <Table>
        {/* Table Header */}
        <Table.Header>
          <Table.HeaderCell className='w-0 text-center'>##</Table.HeaderCell>
          <Table.HeaderCell>Nome</Table.HeaderCell>
          <Table.HeaderCell className='hidden sm:table-cell'>
            Matrícula
          </Table.HeaderCell>
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
                )}>
                {student.name}
              </Table.RowCell>
              <Table.RowCell className='hidden sm:table-cell'>
                #{formatId(student.id, { pad: 3 })}
              </Table.RowCell>
              <Table.RowCell className='flex justify-end'>
                <Button.Group>
                  <Button
                    as={Link}
                    href={route('test')}
                    color='blue'
                    title='Visualizar professor'
                    size='xs'>
                    <Eye className='size-4' />
                  </Button>
                  <Button
                    as={Link}
                    href={route('test')}
                    color='green'
                    title='Editar professor'
                    size='xs'>
                    <PencilLine className='mx-1 size-4' />
                  </Button>
                </Button.Group>
              </Table.RowCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

function NotFoundGroup() {
  return <NotFound icon>Nenhum turma selecionada...</NotFound>
}

//
PageGroupIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
