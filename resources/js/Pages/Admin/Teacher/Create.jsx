import { Link, usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'
import { breadcrumbs, titles } from './data'

// ===============================================
export default function PageTeacherCreate() {
  const { message, teacherId } = usePage().props.flash || {}

  const formOptions = { method: 'POST', route: 'admin.teachers.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* flash message */}
        {message && (
          <Alert color='success'>
            <div>{message}</div>
            <Link
              href={route('admin.teachers.show', { teacher: teacherId })}
              className='font-medium underline'>
              Clique aqui para vê-lo.
            </Link>
          </Alert>
        )}

        {/* header teacher */}
        <Form.Header>
          <Form.HeaderTitle title={titles.create} />
        </Form.Header>

        {/* form */}
        <TeacherFormData {...{ errors }} />

        {/* address teacher */}
        <AddressFormData {...{ errors }} />

        {/* footer teacher */}
        <Form.Footer>
          <Form.FooterButtonReset disabled={isLoading} />
          <Form.FooterButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

// ------------------------------------
PageTeacherCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
