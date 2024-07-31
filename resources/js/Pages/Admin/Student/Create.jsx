import { Link } from '@inertiajs/react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'

import { breadcrumbs, titles } from './data'

//
export default function PageStudentCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.students.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* flash message */}
      {!!flash?.message && (
        <Alert>
          <div>{flash?.message}</div>
          <Link
            href={flash.link}
            className='font-semibold underline hover:text-blue-500'
          >
            Clique aqui para vê-lo.
          </Link>
        </Alert>
      )}

      {/* header student */}
      <Form.Header>
        <Form.Title title={titles.create} />
      </Form.Header>

      {/* form */}
      <StudentFormData {...{ errors }} />

      {/* footer student */}
      <Form.Footer>
        <Form.ButtonReset disabled={isLoading} />
        <Form.ButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

//
PageStudentCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
