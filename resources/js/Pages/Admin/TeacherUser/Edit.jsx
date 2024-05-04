import { usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

export default function PageTeacherUserEdit({ teacher = {}, user = {} }) {
  const { message } = usePage().props.flash || {}

  const formOptions = {
    method: 'PUT',
    route: 'admin.teachers.users.update',
    params: { teacher, user },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  const pageTitle = `${titles.edit} - ${teacher.name}`

  return (
    <Form onSubmit={handleSubmit} autoComplete='false'>
      {/* flash message */}
      {message && <Alert color='success'>{message}</Alert>}

      {/* header teacher */}
      <Form.Header>
        <Form.HeaderTitle title={pageTitle} />
      </Form.Header>

      <UserFormData {...{ data: user, errors }} />

      {/* footer teacher */}
      <Form.Footer>
        <Form.FooterButtonReset disabled={isLoading} />
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ------------------------------------
PageTeacherUserEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
