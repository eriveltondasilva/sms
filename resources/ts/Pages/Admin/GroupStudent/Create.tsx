import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'
import type { GroupStudentCreateProps } from './types'

import { GroupStudentPagination } from './Partials/GroupStudentPagination'
import { GroupStudentSearchBar } from './Partials/GroupStudentSearchBar'
import { GroupStudentTable } from './Partials/GroupStudentTable'

export default function GroupStudentCreate({
  group,
  studentPagination,
  flash,
}: GroupStudentCreateProps) {
  const title = `${titles.create} - ${group.name}`

  const hasStudents = studentPagination.data.length > 0
  const hasPagination = studentPagination.total > studentPagination.data.length

  const message = 'Tem certeza que deseja adicionar o aluno?'

  const { isLoading, handleAction: handleStoreAction } = useActionHandler({
    method: 'post',
    route: 'admin.groups.students.store',
    options: {
      onBefore: () => confirm(message),
    },
  })

  return (
    <AuthLayout
      title={titles.create}
      breadcrumb={breadcrumbs.create}
    >
      {!!flash?.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss
        >
          {flash?.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title text={title} />
      </PageHeader>

      <GroupStudentSearchBar group={group} />

      {!hasStudents && (
        <NotFound>
          Nenhum aluno encontrado para a turma do&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {hasStudents && (
        <GroupStudentTable
          group={group}
          students={studentPagination.data}
          disabled={isLoading}
          onClick={handleStoreAction}
        />
      )}

      {hasPagination && (
        <GroupStudentPagination pagination={studentPagination} />
      )}
    </AuthLayout>
  )
}
