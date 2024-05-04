import { Link, usePage } from '@inertiajs/react'
import { Button, Card, Tooltip } from 'flowbite-react'
import { PencilLine, Plus } from 'lucide-react'

import Title from '@/Components/Title'

import AuthLayout from '@/Layouts/AuthLayout'

import GroupNotFound from './Partials/GroupNotFound'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageGroupIndex({ groups = [] }) {
  const { activeYear } = usePage().props.auth || ''

  const pageTitle = `${titles.index} - ${activeYear}`
  const hasGroups = groups.length > 0

  return (
    <>
      {/* Título */}
      <Title>
        <Title.Left title={pageTitle} />

        <Title.Right>
          <Button as={Link} href={route('admin.groups.create')} color='blue'>
            <Plus className='mr-2 h-5 w-5' />
            Cadastrar Turma
          </Button>
        </Title.Right>
      </Title>

      <br />

      {/* Exibe mensagem se não houver grupos */}
      {!hasGroups && <GroupNotFound />}

      {/* Exibe os cards das turmas */}
      {hasGroups && <GroupCard {...{ groups }} />}
    </>
  )
}

// ----------------------------------------------
function GroupCard({ groups = [] }) {
  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {groups.map((group) => (
        <Card key={group.id} className='max-w-sm'>
          <header className='flex justify-between'>
            <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {group.name}
            </h5>

            <Tooltip content='Editar Turma'>
              <Button
                href={route('admin.groups.edit', { group })}
                color='green'
                size='xs'
                as={Link}>
                <PencilLine className='h-4 w-4' />
              </Button>
            </Tooltip>
          </header>

          <ul className='font-normal text-gray-700 dark:text-gray-400'>
            <li>Alunos: {group.students_count || 'sem aluno'}</li>
            <li>Professores: {group.teachers_count || 'sem prof.'}</li>
          </ul>

          <footer className='space-y-4'>
            <Button
              as={Link}
              href={route('admin.groups.students.index', { group })}
              color='blue'
              size='sm'
              className='uppercase'
              fullSized>
              Alunos
            </Button>
            <Button
              as={Link}
              href={route('admin.groups.teachers.index', { group })}
              color='warning'
              size='sm'
              className='uppercase'
              fullSized>
              Professores
            </Button>
          </footer>
        </Card>
      ))}
    </section>
  )
}

// ==============================================
PageGroupIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
