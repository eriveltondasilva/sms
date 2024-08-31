import { Link } from '@inertiajs/react'
import { Button, Card } from 'flowbite-react'
import { twJoin } from 'tailwind-merge'

import { Indicator } from '@/Components/Indicator'
import { formatDate } from '@/Utils/formatDate'

import type { SchoolYearCardProps } from '../types'

export function SchoolYearCard({ schoolYears }: SchoolYearCardProps) {
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {schoolYears.map((schoolYear) => (
        <Card
          key={schoolYear.id}
          className='relative max-w-sm'
        >
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
