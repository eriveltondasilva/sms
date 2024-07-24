import { BookCopy, Calendar, Users, UsersRound } from 'lucide-react'

import AuthLayout from '@/Layouts/AuthLayout'

import { breadcrumbs, titles } from './data'

// ====================================
export default function Dashboard({ data }) {
  const { activeYear, studentsCount, groupsCount } = data || {}

  const statistics = [
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
      value: activeYear?.year,
    },
  ]

  return (
    <AuthLayout
      title={titles.dashboard}
      breadcrumb={breadcrumbs.dashboard}
      statistics={statistics}
    >
      teste
    </AuthLayout>
  )
}
