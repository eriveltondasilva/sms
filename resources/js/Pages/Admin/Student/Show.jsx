import { Link, usePage } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { PencilLine, Plus } from 'lucide-react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

// ====================================
export default function PageStudentShow({ student = {} }) {
  const { message } = usePage().props.flash || {}

  return (
    <Form>
      {/* flash message */}
      {message && <Alert color='success'>{message}</Alert>}

      {/* header student */}
      <Form.Header>
        <Form.HeaderTitle title={titles.show} />
        <Button.Group>
          <Button
            title='Editar aluno'
            href={route('admin.students.edit', { student })}
            color='blue'
            size='xs'
            as={Link}>
            <PencilLine className='h-4 w-4' />
          </Button>
          <Button
            title='Cadastrar novo aluno'
            href={route('admin.students.create')}
            color='green'
            size='xs'
            as={Link}>
            <Plus className='mx-1 h-4 w-4' />
          </Button>
        </Button.Group>
      </Form.Header>

      {/* student form data */}
      <StudentFormData data={student} readOnly />
    </Form>
  )
}

// ----------------------------------------------
PageStudentShow.layout = (page) => (
  <AuthLayout
    title={titles.show}
    breadcrumb={breadcrumbs.show}
    children={page}
  />
)
