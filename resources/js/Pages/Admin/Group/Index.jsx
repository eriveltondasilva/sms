import { Link } from '@inertiajs/react'
import { Button, Card, Tooltip } from 'flowbite-react'
import { PencilLine, Plus } from 'lucide-react'

import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import GroupNotFound from './Partials/GroupNotFound'
import { breadcrumbs, titles } from './data'

export default function PageGroupIndex({ groups = [], auth = {} }) {
  const title = `${titles.index} - ${auth.activeYear}`
  const hasGroups = groups.length > 0

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button href={route('admin.groups.create')}>
          <Plus className='mr-1 size-5' />
          Nova Turma
        </PageHeader.Button>
      </PageHeader>

      {/* Exibe mensagem se não houver grupos */}
      {!hasGroups && <GroupNotFound />}

      {/* Exibe os cards das turmas */}
      {hasGroups && <GroupCard groups={groups} />}
    </>
  )
}

function GroupCard({ groups = [] }) {
  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {groups.map((group) => (
        <Card
          key={group.id}
          className='max-w-sm'>
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
                <PencilLine className='size-4' />
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

//
PageGroupIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
