import { Link } from '@inertiajs/react'
import { Button, Card, Tooltip } from 'flowbite-react'
import { PencilLine, Plus } from 'lucide-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'

import { AuthLayout } from '@/Layouts/AuthLayout'
import type { Group, PageProps } from '@/Types'

import { breadcrumbs, titles } from './data'

type PageGroupIndexProps = {
  groups: Group[]
}

export default function PageGroupIndex({
  groups,
  auth,
}: PageProps<PageGroupIndexProps>) {
  const hasGroups = groups.length > 0

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.groups.create')}>
          <Plus className='mr-1 size-5' />
          Nova Turma
        </PageHeader.Button>
      </PageHeader>

      {/* Exibe mensagem se não houver grupos */}
      {!hasGroups && (
        <NotFound>
          Nenhuma turma encontrada para o&nbsp;
          <strong>Ano Letivo {auth.activeYear.year}</strong>.
        </NotFound>
      )}

      {/* Exibe os cards das turmas */}
      {hasGroups && <GroupCard groups={groups} />}
    </AuthLayout>
  )
}

function GroupCard({ groups }: PageGroupIndexProps) {
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
                as={Link}
              >
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
              className='uppercase'
              color='blue'
              size='sm'
            >
              Alunos
            </Button>
            <Button
              as={Link}
              href={route('admin.groups.teachers.index', { group })}
              className='uppercase'
              color='warning'
              size='sm'
            >
              Professores
            </Button>
          </footer>
        </Card>
      ))}
    </section>
  )
}
