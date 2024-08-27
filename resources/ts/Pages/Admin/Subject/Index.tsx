import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'
import type { PageProps, Subject } from '@/Types'

import { breadcrumbs, titles } from './data'

type SubjectWithCount = {
  teachers_count: number
} & Subject

type PageSubjectIndexProps = {
  subjects: SubjectWithCount[]
}

export default function PageSubjectIndex({
  subjects,
  auth,
}: PageProps<PageSubjectIndexProps>) {
  const hasSubjects = subjects.length > 0
  const title = `${titles.index} - ${auth.activeYear.year}`

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {!hasSubjects && (
        <NotFound>
          Não existem disciplinas criadas para o&nbsp;
          <strong>Ano Letivo {auth.activeYear.year}</strong>.
        </NotFound>
      )}

      <CardSubject subjects={subjects} />
    </AuthLayout>
  )
}

type CardSubjectProps = {
  subjects: SubjectWithCount[]
}

function CardSubject({ subjects }: CardSubjectProps) {
  if (subjects.length === 0) return null

  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {subjects.map((subject) => (
        <Card key={subject.id} className='max-w-sm'>
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
