import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'
import { Plus } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import Indicator from '@/Components/Indicator'
import Title from '@/Components/Title'

import AuthLayout from '@/Layouts/AuthLayout'
import formatDate from '@/Utils/formatDate'

import AcademicYearNotFound from './Partials/AcademicYearNotFound'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageAcademicYearIndex({ academicYears = [] }) {
  const hasAcademicYears = academicYears.length > 0

  return (
    <>
      {/* título */}
      <Title>
        <Title.Left title={titles.index} />
        <Title.Right>
          <Button
            as={Link}
            href={route('admin.academic-years.create')}
            color='blue'>
            <Plus className='mr-2 h-5 w-5' />
            Cadastrar Ano Letivo
          </Button>
        </Title.Right>
      </Title>

      <br />

      {/* Exibe mensagem se não houver anos letivos */}
      {!hasAcademicYears && <AcademicYearNotFound />}

      {/* Exibe os cards dos anos letivos */}
      {hasAcademicYears && <AcademicYearCard {...{ academicYears }} />}
    </>
  )
}

// ----------------------------------------------
function AcademicYearCard({ academicYears = [] }) {
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {academicYears.map((academicYear) => (
        <Card key={academicYear.id} className='relative max-w-sm'>
          <Indicator type={academicYear.is_active ? 'success' : 'secondary'} />

          <h5
            className={twJoin(
              'text-2xl font-bold tracking-tight',
              'text-gray-900 dark:text-white'
            )}>
            {academicYear.year}
          </h5>

          <ul className='font-normal text-gray-700 dark:text-gray-400'>
            <li>Início: {formatDate(academicYear.start_date)}</li>
            <li>Fim: {formatDate(academicYear.end_date)}</li>
            <li className='mt-2 font-semibold'>
              Turmas: {academicYear.groups_count}
            </li>
          </ul>

          <footer>
            <Button
              as={Link}
              href={route('admin.academic-years.edit', { academicYear })}
              color='blue'
              className='uppercase'
              fullSized>
              Ano Letivo
            </Button>
          </footer>
        </Card>
      ))}
    </section>
  )
}

// ==============================================
PageAcademicYearIndex.layout = (page) => (
  <AuthLayout
    title={titles.index}
    breadcrumb={breadcrumbs.index}
    children={page}
  />
)
