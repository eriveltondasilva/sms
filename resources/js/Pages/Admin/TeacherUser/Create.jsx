import { Form } from '@/Components/Form'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { PageHeader } from '@/Components/PageHeader'
import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

export default function PageTeacherUserCreate({ teacher = {} }) {
  const formOptions = {
    method: 'POST',
    route: 'admin.teachers.users.store',
    params: { teacher },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  const title = `${titles.create} - ${teacher.name}`

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <UserFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageTeacherUserCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
