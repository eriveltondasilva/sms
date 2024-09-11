import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'

import { GroupTeacherTable } from './Partials/GroupTeacherTable'

import { breadcrumbs, titles } from './data'
import type { GroupTeacherCreateProps } from './types'

export default function GroupTeacherCreate({
  group,
  teachers,
  flash,
}: GroupTeacherCreateProps) {
  const title = `${titles.create} - ${group.name}`
  const hasTeachers = teachers.length > 0

  const { isLoading, handleAction: handleStoreAction } = useActionHandler({
    method: 'post',
    route: 'admin.groups.teachers.store',
  })

  return (
    <AuthLayout
      title={titles.create}
      breadcrumb={breadcrumbs.create}
    >
      {flash?.message && (
        <Alert
          color='success'
          onDismiss
        >
          {flash?.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title text={title} />
      </PageHeader>

      {!hasTeachers && (
        <NotFound>
          Nenhum professor encontrado para a turma do&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {hasTeachers && (
        <GroupTeacherTable
          group={group}
          teachers={teachers}
          disabled={isLoading}
          onClick={handleStoreAction}
        />
      )}
    </AuthLayout>
  )
}
