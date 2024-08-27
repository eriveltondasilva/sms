import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'
import { Plus } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { Indicator } from '@/Components/Indicator'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'

import { AuthLayout } from '@/Layouts/AuthLayout'
import { formatDate } from '@/Utils/formatDate'

import { SchoolYear } from '@/Types'
import { breadcrumbs, titles } from './data'

type SchoolYearWithCount = SchoolYear & {
  groups_count: number
}

type PageSchoolYearIndexProps = {
  schoolYears: SchoolYearWithCount[]
}

export default function PageSchoolYearIndex({
  schoolYears,
}: PageSchoolYearIndexProps) {
  const hasSchoolYears = schoolYears.length > 0

  return (
    <AuthLayout title={titles.index} breadcrumb={breadcrumbs.index}>
      <PageHeader>
        <PageHeader.Title title={titles.index} />
        <PageHeader.Button href={route('admin.school-years.create')}>
          <Plus className='mr-1 size-5' />
          Novo Ano Letivo
        </PageHeader.Button>
      </PageHeader>

      {/* Exibe mensagem se não houver anos letivos */}
      {!hasSchoolYears && (
        <NotFound>Não existem anos letivos criados.</NotFound>
      )}

      {/* Exibe os cards dos anos letivos */}
      {hasSchoolYears && <SchoolYearCard schoolYears={schoolYears} />}
    </AuthLayout>
  )
}

function SchoolYearCard({ schoolYears }: PageSchoolYearIndexProps) {
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {schoolYears.map((schoolYear) => (
        <Card key={schoolYear.id} className='relative max-w-sm'>
          <Indicator type={schoolYear.is_active ? 'success' : 'secondary'} />

          <h5
            className={twJoin(
              'text-2xl font-bold tracking-tight',
              'text-gray-900 dark:text-white',
            )}
          >
            {schoolYear.year}
          </h5>

          <ul className='font-normal text-gray-700 dark:text-gray-400'>
            <li>Início: {formatDate(schoolYear.start_date)}</li>
            <li>Fim: {formatDate(schoolYear.end_date)}</li>
            <li className='mt-2 font-semibold'>
              Turmas: {schoolYear.groups_count}
            </li>
          </ul>

          <footer>
            <Button
              as={Link}
              href={route('admin.school-years.edit', { schoolYear })}
              color='blue'
              className='uppercase'
              fullSized
            >
              Ano Letivo
            </Button>
          </footer>
        </Card>
      ))}
    </section>
  )
}
