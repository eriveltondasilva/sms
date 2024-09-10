import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine, Search } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Input } from '@/Components/Input'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { SearchBar } from '@/Components/SearchBar'
import { Table } from '@/Components/Table'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import type { SchoolYear, Student } from '@/Types'
import { formatId } from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'

export default function GroupIndex({
  activeYear,
  teacherGroups,
  selectedGroup,
}: PageGroupIndexProps) {
  const title = `${titles.index} - ${activeYear.year}`
  const hasGroup = selectedGroup.students.length > 0

  const { handleSubmit: handleSearch, isLoading } = useFormHandler({
    route: 'teacher.groups.index',
  })

  const groupOptions = ['', ...teacherGroups]

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      <SearchBar onSubmit={handleSearch}>
        <SearchBar.Left>
          <Input.Select
            id='search'
            defaultValue={selectedGroup.id}
            values={groupOptions}
          />
          <Button
            type='submit'
            color='blue'
            disabled={isLoading}
          >
            <Search className='size-5' />
          </Button>
        </SearchBar.Left>
      </SearchBar>

      {!hasGroup && <NotFound>Nenhum turma selecionada...</NotFound>}

      <h3 className='mb-3 text-lg'>
        # Turma selecionada: {selectedGroup.name} (
        {selectedGroup.school_year_id})
      </h3>

      {hasGroup && <StudentTable students={selectedGroup.students} />}
    </AuthLayout>
  )
}

function StudentTable({ students }: { students: Student[] }) {
  return (
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
                'text-gray-900 dark:text-white',
              )}
            >
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
                  size='xs'
                >
                  <Eye className='size-4' />
                </Button>
                <Button
                  as={Link}
                  href={route('test')}
                  color='green'
                  title='Editar professor'
                  size='xs'
                >
                  <PencilLine className='mx-1 size-4' />
                </Button>
              </Button.Group>
            </Table.RowCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
