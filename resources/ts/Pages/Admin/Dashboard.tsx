import {
  AlertCircle,
  BookCopy,
  Calendar,
  Users,
  UsersRound,
} from 'lucide-react'

import { Alert } from '@/Components'
import { AuthLayout } from '@/Layouts/AuthLayout'

import type { Stats } from '@/Types'

import { breadcrumbs, titles } from './data'
import type { DashboardProps } from './types'

export default function Dashboard({ auth, flash, ...props }: DashboardProps) {
  const stats: Stats[] = [
    {
      title: 'Alunos',
      icon: UsersRound,
      value: props.studentsCount ?? 0,
    },
    {
      title: 'Professores',
      icon: Users,
      value: props.teachersCount ?? 0,
    },
    {
      title: 'Turmas',
      icon: BookCopy,
      value: props.groupsCount ?? 0,
    },
    {
      title: 'Ano Letivo',
      icon: Calendar,
      value: auth?.activeYear?.year ?? 0,
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
