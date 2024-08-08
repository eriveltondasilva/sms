import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

export default function PageTeacherUserEdit({ data, flash }) {
  const { teacher = {}, user = {} } = data

  const formOptions = {
    method: 'PUT',
    route: 'admin.teachers.users.update',
    params: { teacher, user },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  const title = `${titles.edit} - ${teacher.name}`

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <UserFormData
          data={user}
          errors={errors}
        />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageTeacherUserEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
