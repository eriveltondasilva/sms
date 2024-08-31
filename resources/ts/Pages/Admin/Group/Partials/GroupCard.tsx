import { Link } from '@inertiajs/react'
import { Button, Card, Tooltip } from 'flowbite-react'
import { PencilLine } from 'lucide-react'

import type { GroupCardProps } from '../types'

export function GroupCard({ groups }: GroupCardProps) {
  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {groups.map((group) => (
        <Card
          key={group.id}
          className='max-w-sm'
        >
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
