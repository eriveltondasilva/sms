import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import { Check } from 'lucide-react'
import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

//
export default function PageTeacherUserEdit({ data, flash }) {
  const { teacher = {}, user = {} } = data

  const formOptions = {
    method: 'PUT',
    route: 'admin.teachers.users.update',
    params: { teacher, user },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  const pageTitle = `${titles.edit} - ${teacher.name}`

  return (
    <Form
      onSubmit={handleSubmit}
      autoComplete='false'
    >
      {/* flash message */}
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss
        >
          {flash.message}
        </Alert>
      )}

      {/* header teacher */}
      <Form.Header>
        <Form.Title title={pageTitle} />
      </Form.Header>

      <UserFormData
        data={user}
        errors={errors}
      />

      {/* footer teacher */}
      <Form.Footer>
        <Form.ButtonReset disabled={isLoading} />
        <Form.ButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

//
PageTeacherUserEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
