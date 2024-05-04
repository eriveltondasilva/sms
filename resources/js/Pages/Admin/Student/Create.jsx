import { Link, usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'

import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageStudentCreate() {
  const { message, studentId } = usePage().props.flash || {}

  const formOptions = { method: 'POST', route: 'admin.students.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* flash message */}
      {message && (
        <Alert color='success'>
          <div>{message}</div>
          <Link
            href={route('admin.students.show', { student: studentId })}
            className='font-medium underline'>
            Clique aqui para vê-lo.
          </Link>
        </Alert>
      )}

      {/* header student */}
      <Form.Header>
        <Form.HeaderTitle title={titles.create} />
      </Form.Header>

      {/* form */}
      <StudentFormData {...{ errors }} />

      {/* footer student */}
      <Form.Footer>
        <Form.FooterButtonReset disabled={isLoading} />
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ----------------------------------------------
PageStudentCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
