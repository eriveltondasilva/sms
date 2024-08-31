import { Plus } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'

import { TableTeacher } from './Partials/TableTeacher'

import { breadcrumbs, titles } from './data'
import type { SubjectTeacherProps } from './types'

export default function SubjectTeacherIndex({
  subject,
  teachers,
  flash,
}: SubjectTeacherProps) {
  const message = 'Tem certeza que deseja remover professor?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.subjects.teachers.destroy',
    options: {
      onBefore: () => confirm(message),
    },
  })

  const hasTeachers = teachers.length > 0
  const title = `${titles.index} - ${subject.name}`

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      {flash?.message && (
        <Alert
          color='failure'
          onDismiss
        >
          {flash?.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.subjects.teachers.create', { subject })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {!hasTeachers && (
        <NotFound>Nenhum professor encontrado na disciplina...</NotFound>
      )}

      {hasTeachers && (
        <TableTeacher
          subject={subject}
          teachers={teachers}
          disabled={isLoading}
          onClick={handleDeleteAction}
        />
      )}
    </AuthLayout>
  )
}
