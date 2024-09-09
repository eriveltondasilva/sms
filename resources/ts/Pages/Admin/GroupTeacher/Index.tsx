import { Plus } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useActionHandler } from '@/Hooks/useActionHandler'

import { GroupTeacherTable } from './Partials/GroupTeacherTable'

import { breadcrumbs, titles } from './data'
import type { GroupTeacherIndexProps } from './types'

export default function GroupTeacherIndex({
  group,
  teachers,
  flash,
}: GroupTeacherIndexProps) {
  const title = `${titles.index} - ${group.name}`
  const hasTeachers = teachers.length > 0

  const message = 'Tem certeza que deseja remover professor?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.groups.teachers.destroy',
    options: {
      onBefore: () => confirm(message),
    },
  })

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
          href={route('admin.groups.teachers.create', { group })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {!hasTeachers && (
        <NotFound>
          Nenhum professor encontrado para a turma&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {hasTeachers && (
        <GroupTeacherTable
          group={group}
          teachers={teachers}
          disabled={isLoading}
          onClick={handleDeleteAction}
        />
      )}
    </AuthLayout>
  )
}
