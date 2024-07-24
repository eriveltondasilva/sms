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
      statistics={statistics}
    >
      {/* {message && <Alert>{message}</Alert>} */}
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
        eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Molestias blanditiis minima quia qui earum enim harum nostrum iste ipsum
        pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Molestias blanditiis minima quia qui earum enim harum nostrum iste
        ipsum pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius. Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Molestias blanditiis minima quia qui earum enim harum nostrum iste
        ipsum pariatur nihil voluptate eveniet sequi, recusandae optio nobis
        voluptatem vero voluptatum fugit delectus cupiditate sint fugiat!
        Reiciendis repellendus iste animi, nemo itaque similique illum.
        Similique corrupti animi ex praesentium eligendi harum? Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Sint voluptatibus officiis
        mollitia aperiam exercitationem perferendis, est natus impedit tempore
        nobis voluptate fugit quo, nostrum culpa inventore amet itaque harum
        fuga? Porro laboriosam, culpa id rem aperiam inventore blanditiis odio,
        fugit esse corporis rerum aspernatur nesciunt distinctio magnam
        provident enim eius.
      </div>
    </AuthLayout>
  )
}
