import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'

import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import SubjectNotFound from './Partials/SubjectNotFound'
import { breadcrumbs, titles } from './data'

//
export default function PageSubjectIndex({ subjects, auth }) {
  const hasSubjects = subjects.length > 0
  const title = `${titles.index} - Ano Letivo: ${auth.activeYear}`

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {/* Exibe mensagem se não houver grupos */}
      {!hasSubjects && <SubjectNotFound />}

      {/* Exibe os cards das turmas */}
      {hasSubjects && <CardSubject subjects={subjects} />}
    </>
  )
}

function CardSubject({ subjects = [] }) {
  return (
    <section className='grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {subjects.map((subject) => (
        <Card
          key={subject.id}
          className='max-w-sm'>
          <header className=''>
            <h5
              className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'
              title={subject.name}>
              {subject.abbr}
            </h5>
          </header>

          <p className='my-3 font-normal text-gray-700 dark:text-gray-400'>
            Professores: {subject.teachers_count || 'sem prof.'}
          </p>

          <footer>
            <Button
              as={Link}
              href={route('admin.subjects.teachers.index', { subject })}
              color='warning'
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

// -----------------------------------------------
PageSubjectIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
