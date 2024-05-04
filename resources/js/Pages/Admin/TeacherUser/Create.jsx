import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

export default function PageTeacherUserCreate({ teacher = {} }) {
  const formOptions = {
    method: 'POST',
    route: 'admin.teachers.users.store',
    params: { teacher },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  const pageTitle = `${titles.create} - ${teacher.name}`

  return (
    <Form onSubmit={handleSubmit} autoComplete='false'>
      {/* header teacher */}
      <Form.Header>
        <Form.HeaderTitle title={pageTitle} />
      </Form.Header>

      {/* form data */}
      <UserFormData {...{ errors }} />

      {/* footer teacher */}
      <Form.Footer>
        <Form.FooterButtonReset disabled={isLoading} />
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ------------------------------------
PageTeacherUserCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
