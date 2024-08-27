import {
  AlertCircle,
  BookCopy,
  Calendar,
  Users,
  UsersRound,
} from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { AuthLayout } from '@/Layouts/AuthLayout'

import type { SchoolYear, PageProps, Stats } from '@/Types'

import { breadcrumbs, titles } from './data'

type DashboardProps = {
  studentsCount: number
  teachersCount: number
  groupsCount: number
  activeYear: SchoolYear
}

export default function Dashboard({
  flash,
  ...data
}: PageProps<DashboardProps>) {
  const stats: Stats[] = [
    {
      title: 'Alunos',
      icon: UsersRound,
      value: data.studentsCount,
    },
    {
      title: 'Professores',
      icon: Users,
      value: data.teachersCount,
    },
    {
      title: 'Turmas',
      icon: BookCopy,
      value: data.groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: Calendar,
      value: data.activeYear.year,
    },
  ]

  return (
    <AuthLayout
      title={titles.dashboard}
      breadcrumb={breadcrumbs.dashboard}
      stats={stats}
    >
      {flash?.message && <Alert icon={AlertCircle}>{flash?.message}</Alert>}

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
    </AuthLayout>
  )
}
