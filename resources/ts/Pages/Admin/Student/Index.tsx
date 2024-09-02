import { Plus } from 'lucide-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'
import { Pagination } from '@/Pages/Partials/Pagination'

import { StudentSearchBar } from './Partials/StudentSearchBar'
import { StudentTable } from './Partials/StudentTable'

import { breadcrumbs, titles } from './data'
import type { StudentIndexProps } from './types'

export default function StudentIndex({ studentPagination }: StudentIndexProps) {
  const hasStudents = studentPagination.data.length > 0
  const hasPagination = studentPagination.total > studentPagination.data.length
  console.log('props:', studentPagination)

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.students.create')}>
          <Plus className='mr-1 size-5' />
          Novo Aluno
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <StudentSearchBar />

      {!hasStudents && <NotFound>Não foram encontrados alunos...</NotFound>}

      {hasStudents && <StudentTable students={studentPagination.data} />}

      {hasPagination && <Pagination pagination={studentPagination} />}
    </AuthLayout>
  )
}
