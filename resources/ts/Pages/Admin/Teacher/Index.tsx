import { Plus } from 'lucide-react'

import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { TeacherPagination } from './Partials/TeacherPagination'
import { TeacherSearchBar } from './Partials/TeacherSearchBar'
import { TeacherTable } from './Partials/TeacherTable'

import { breadcrumbs, titles } from './data'
import type { TeacherIndexProps } from './types'

export default function TeacherIndex({ teacherPagination }: TeacherIndexProps) {
  const hasTeachers = teacherPagination.data.length > 0
  const hasPagination = teacherPagination.total <= teacherPagination.data.length

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.teachers.create')}>
          <Plus className='mr-1 size-5' />
          Novo Professor
        </PageHeader.Button>
        {/* TODO: implementar PDF */}
      </PageHeader>

      <TeacherSearchBar />

      {!hasTeachers && (
        <NotFound>Não foi encontrado nenhum professor.</NotFound>
      )}

      {hasTeachers && <TeacherTable teachers={teacherPagination.data} />}

      {hasPagination && <TeacherPagination pagination={teacherPagination} />}
    </AuthLayout>
  )
}
