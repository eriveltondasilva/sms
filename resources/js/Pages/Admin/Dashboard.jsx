// import Calendar from '@/Components/Calendar'
import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'

import Alert from '@/Components/Alert'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

let statistics = []

// =====================================
export default function DashboardPage({ data, message }) {
  const { studentsCount, teachersCount, groupsCount, activeYear } = data || {}

  statistics = [
    {
      title: 'Alunos',
      icon: <UsersRound />,
      value: studentsCount,
    },
    {
      title: 'Professores',
      icon: <Users />,
      value: teachersCount,
    },
    {
      title: 'Turmas',
      icon: <BookCopy />,
      value: groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: <Calendar />,
      value: activeYear,
    },
  ]

  return <>{message && <Alert>{message}</Alert>}</>
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
