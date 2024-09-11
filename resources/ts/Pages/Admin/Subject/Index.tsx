import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { CardSubject } from './Partials/SubjectCard'

import { breadcrumbs, titles } from './data'
import type { SubjectIndexProps } from './types'

export default function SubjectIndex({ subjects, auth }: SubjectIndexProps) {
  const hasSubjects = subjects.length > 0
  const title = `${titles.index} - ${auth?.activeYear.year}`

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title text={title} />
      </PageHeader>

      {!hasSubjects && (
        <NotFound>
          Não existem disciplinas criadas para o&nbsp;
          <strong>Ano Letivo {auth?.activeYear.year}</strong>.
        </NotFound>
      )}

      {hasSubjects && <CardSubject subjects={subjects} />}
    </AuthLayout>
  )
}
