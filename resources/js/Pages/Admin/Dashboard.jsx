// import Calendar from '@/Components/Calendar'
import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

// =====================================
export default function Dashboard({ data, message }) {
  const { studentsCount, teachersCount, groupsCount, activeYear } = data || {}

  const statistics = [
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

  return (
    <AuthLayout
      title={titles.dashboard}
      breadcrumb={breadcrumbs.dashboard}
      statistics={statistics}>
      {message && <Alert>{message}</Alert>}
    </AuthLayout>
  )
}
