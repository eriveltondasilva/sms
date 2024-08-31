import { Check, Plus } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'
import type { GroupStudentIndexProps } from './types'

import { GroupStudentTable } from './Partials/GroupStudentTable'

export default function GroupStudentIndex({
  group,
  students,
  flash,
}: GroupStudentIndexProps) {
  const title = `${titles.index} - ${group.name}`
  const hasStudents = students.length > 0

  const message = 'Tem certeza que deseja remover o aluno?'

  const { isLoading, handleAction: handleDeleteAction } = useActionHandler({
    method: 'delete',
    route: 'admin.groups.students.destroy',
    options: {
      onBefore: () => confirm(message),
    },
  })

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      {!!flash.message && (
        <Alert
          color='failure'
          icon={Check}
          onDismiss
        >
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
        <PageHeader.Button
          href={route('admin.groups.students.create', { group })}
        >
          <Plus className='mr-1 size-5' />
          Adicionar alunos
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      {!hasStudents && (
        <NotFound>
          Nenhum aluno encontrado na turma do&nbsp;
          <strong>{group.name}</strong>.
        </NotFound>
      )}

      {hasStudents && (
        <GroupStudentTable
          group={group}
          students={students}
          disabled={isLoading}
          onClick={handleDeleteAction}
        />
      )}
    </AuthLayout>
  )
}
