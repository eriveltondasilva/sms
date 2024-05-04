import { usePage } from '@inertiajs/react'
import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'
import { toast } from 'react-hot-toast'

import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

let statistics = []

// ====================================
export default function DashboardPage({ data }) {
  const { activeYear, studentsCount, groupsCount } = data || {}
  const { message } = usePage().props

  if (!!message) toast.success(message, { id: 'dashboard-toast' })

  statistics = [
    {
      title: 'Alunos',
      icon: <UsersRound />,
      value: studentsCount,
    },
    {
      title: 'Turmas',
      icon: <Users />,
      value: groupsCount,
    },
    {
      title: 'Turmas',
      icon: <BookCopy />,
      value: groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: <Calendar />,
      value: activeYear.year,
    },
  ]

  return <></>
}

// ====================================
DashboardPage.layout = (page) => (
  <AuthLayout
    title={titles.dashboard}
    breadcrumb={breadcrumbs.dashboard}
    statistics={statistics}
    children={page}
  />
)
