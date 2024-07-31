import { usePage } from '@inertiajs/react'
import { BookCopy, Calendar, UsersRound } from 'lucide-react'

import { StatCard } from '@/Components/StatCard'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

//
export default function Dashboard() {
  return <></>
}

function DashboardStats() {
  const { data } = usePage()?.props || {}

  console.log(usePage().props)

  const stats = [
    {
      title: 'Alunos',
      icon: <UsersRound />,
      value: data?.studentsCount,
    },
    {
      title: 'Turmas',
      icon: <BookCopy />,
      value: data?.groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: <Calendar />,
      value: data?.activeYear,
    },
  ]

  if (!data) {
    return null
  }

  return (
    <ul className='grid gap-4 md:grid-cols-3'>
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
