import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'

import type { CardSubjectProps } from '../types'

export function CardSubject({ subjects }: CardSubjectProps) {
  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {subjects.map((subject) => (
        <Card
          key={subject.id}
          className='max-w-sm'
        >
          <header className=''>
            <dl>
              <dt
                className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
                title={subject.name}
              >
                {subject.abbr}
              </dt>
              <dd
                className='text-gray-700 dark:text-gray-400'
                title={subject.name}
              >
                {subject.name}
              </dd>
            </dl>
          </header>

          <ul>
            <li className='my-3 font-normal text-gray-700 dark:text-gray-400'>
              Professores: {subject.teachers_count || 'sem prof.'}
            </li>
          </ul>

          <footer>
            <Button
              as={Link}
              href={route('admin.subjects.teachers.index', { subject })}
              color='warning'
              className='uppercase'
              fullSized
            >
              Professores
            </Button>
          </footer>
        </Card>
      ))}
    </section>
  )
}
