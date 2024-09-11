import { Plus } from 'lucide-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { SchoolYearCard } from './Partials/SchoolYearCard'

import { breadcrumbs, titles } from './data'
import type { SchoolYearIndexProps } from './types'

export default function SchoolYearIndex({ schoolYears }: SchoolYearIndexProps) {
  const hasSchoolYears = schoolYears.length > 0

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title text={titles.index} />
        <PageHeader.Button href={route('admin.school-years.create')}>
          <Plus className='mr-1 size-5' />
          Novo Ano Letivo
        </PageHeader.Button>
      </PageHeader>

      {!hasSchoolYears && (
        <NotFound>Não existem anos letivos criados.</NotFound>
      )}

      {hasSchoolYears && <SchoolYearCard schoolYears={schoolYears} />}
    </AuthLayout>
  )
}
