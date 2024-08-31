import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'

import { TableTeacher } from './Partials/TableTeacher'

import { breadcrumbs, titles } from './data'
import type { SubjectTeacherProps } from './types'

export default function SubjectTeacherCreate({
  subject,
  teachers,
  flash,
}: SubjectTeacherProps) {
  const { isLoading, handleAction: handleStoreAction } = useActionHandler({
    method: 'post',
    route: 'admin.subjects.teachers.store',
  })

  const title = `${titles.create} - ${subject.name}`
  const hasTeachers = teachers.length > 0

  return (
    <AuthLayout
      title={titles.create}
      breadcrumb={breadcrumbs.create}
    >
      {!!flash.message && (
        <Alert
          color='success'
          onDismiss
        >
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      {!hasTeachers && (
        <NotFound>Nenhum professor encontrado na disciplina...</NotFound>
      )}

      {hasTeachers && (
        <TableTeacher
          subject={subject}
          teachers={teachers}
          disabled={isLoading}
          onClick={handleStoreAction}
        />
      )}
    </AuthLayout>
  )
}
