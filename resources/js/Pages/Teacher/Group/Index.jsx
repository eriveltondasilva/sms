import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Eye, PencilLine } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import Input from '@/Components/Input'
import NotFound from '@/Components/NotFound'
import Searchbar from '@/Components/Searchbar'
import Table from '@/Components/Table'
import Title from '@/Components/Title'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'
import formatId from '@/Utils/formatId'

import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageGroupIndex({ data }) {
  const { activeYear, teacherGroups, selectedGroup } = data || {}

  const pageTitle = `${titles.index} - ${activeYear}`
  const hasGroup = selectedGroup?.students?.length > 0

  const formOptions = { method: 'GET', route: 'teacher.groups.index' }
  const { handleSubmit: handleSearch, isLoading } = useFormHandler(formOptions)

  return (
    <>
      {/* Título */}
      <Title>
        <Title.Left title={pageTitle} />
      </Title>

      {/* Selecionar Turma */}
      <Searchbar onSubmit={handleSearch}>
        <Searchbar.Left>
          <Input.Select
            id='search'
            className='mb-0'
            defaultValue={selectedGroup?.id}
            values={['', ...teacherGroups]}
          />
          <Button type='submit' color='blue' disabled={isLoading}>
            Selecionar
          </Button>
        </Searchbar.Left>
      </Searchbar>

      <br />

      {/* Exibe mensagem se não houver grupos */}
      {!hasGroup && <NotFoundGroup />}

      {/* Exibe os cards das turmas */}
      {hasGroup && <StudentTable students={selectedGroup?.students} />}
    </>
  )
}

// -----------------------------------------------
function StudentTable({ students = [] }) {
  return (
    <Table>
      {/* Table Header */}
      <Table.Header>
        <Table.HeaderCell className='w-0 text-center'></Table.HeaderCell>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Matrícula</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Header>

      {/* Table Body */}
      <Table.Body>
        {students.map((student, index) => (
          <Table.Row key={student.id}>
            <Table.RowCell className='font-bold'>{++index}</Table.RowCell>
            <Table.RowCell
              className={twJoin(
                'whitespace-nowrap font-medium',
                'text-gray-900 dark:text-white'
              )}>
              {student.name}
            </Table.RowCell>
            <Table.RowCell>{formatId(student.id)}</Table.RowCell>
            <Table.RowCell className='flex justify-end'>
              <Button.Group>
                <Button
                  as={Link}
                  href={route('test')}
                  color='blue'
                  title='Visualizar professor'
                  size='xs'>
                  <Eye className='h-4 w-4' />
                </Button>
                <Button
                  as={Link}
                  href={route('test')}
                  color='green'
                  title='Editar professor'
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

function NotFoundGroup() {
  return <NotFound icon>Nenhum turma selecionada...</NotFound>
}

function NotFoundStudent() {
  return <NotFound icon>Nenhum aluno encontrado...</NotFound>
}

// ==============================================
PageGroupIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
