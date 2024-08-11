// import Calendar from '@/Components/Calendar'
import { usePage } from '@inertiajs/react'
import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { StatCard } from '@/Components/StatCard'

import { AuthLayout } from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

//
export default function Dashboard({ flash }) {
  return (
    <>
      {flash?.message && <Alert className='mb-4'>{flash?.message}</Alert>}

      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
        blanditiis minima quia qui earum enim harum nostrum iste ipsum pariatur
        nihil voluptate eveniet sequi, recusandae optio nobis voluptatem vero
        voluptatum fugit delectus cupiditate sint fugiat! Reiciendis repellendus
        iste animi, nemo itaque similique illum. Similique corrupti animi ex
        praesentium eligendi harum? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sint voluptatibus officiis mollitia aperiam
        exercitationem perferendis, est natus impedit tempore nobis voluptate
        fugit quo, nostrum culpa inventore amet itaque harum fuga? Porro
        laboriosam, culpa id rem aperiam inventore blanditiis odio, fugit esse
        corporis rerum aspernatur nesciunt distinctio magnam provident enim
        eius.
      </div>
    </>
  )
}

function DashboardStats() {
  const { data } = usePage()?.props || {}

  const stats = [
    {
      title: 'Alunos',
      icon: <UsersRound />,
      value: data?.studentsCount,
    },
    {
      title: 'Professores',
      icon: <Users />,
      value: data?.teachersCount,
    },
    {
      title: 'Turmas',
      icon: <BookCopy />,
      value: data?.groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: <Calendar />,
      value: data?.activeYear.year,
    },
  ]

  if (!data) {
    return null
  }

  // grid grid-cols-2 gap-4 lg:grid-cols-4
  return (
    <ul className='grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4'>
      {stats.map((stat) => (
        <StatCard key={stat.title}>
          <StatCard.Icon icon={stat.icon} />
          <StatCard.Content>
            <StatCard.Title title={stat.title} />
            <StatCard.Value value={stat.value} />
          </StatCard.Content>
        </StatCard>
      ))}
    </ul>
  )
}

Dashboard.layout = (page) => (
  <AuthLayout
    title={titles.dashboard}
    breadcrumb={breadcrumbs.dashboard}
    stats={<DashboardStats />}
    children={page}
  />
)
