import { Plus } from 'lucide-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'

import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'
import type { GroupIndexProps } from './types'

import { GroupCard } from './Partials/GroupCard'

export default function GroupIndex({ groups, auth }: GroupIndexProps) {
  const hasGroups = groups.length > 0

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.groups.create')}>
          <Plus className='mr-1 size-5' />
          Nova Turma
        </PageHeader.Button>
      </PageHeader>

      {!hasGroups && (
        <NotFound>
          Nenhuma turma encontrada para o&nbsp;
          <strong>Ano Letivo {auth?.activeYear.year}</strong>.
        </NotFound>
      )}

      {hasGroups && <GroupCard groups={groups} />}
    </AuthLayout>
  )
}
