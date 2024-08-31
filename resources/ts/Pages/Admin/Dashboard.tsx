import {
  AlertCircle,
  BookCopy,
  Calendar,
  Users,
  UsersRound,
} from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { AuthLayout } from '@/Layouts/AuthLayout'
import type { Stats } from '@/Types'

import { breadcrumbs, titles } from './data'
import type { DashboardProps } from './types'

export default function Dashboard({ flash, ...props }: DashboardProps) {
  const stats: Stats[] = [
    {
      title: 'Alunos',
      icon: UsersRound,
      value: props.studentsCount,
    },
    {
      title: 'Professores',
      icon: Users,
      value: props.teachersCount,
    },
    {
      title: 'Turmas',
      icon: BookCopy,
      value: props.groupsCount,
    },
    {
      title: 'Ano Letivo',
      icon: Calendar,
      value: props.activeYear.year,
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
