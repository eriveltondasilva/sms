import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'
import type { TeacherUserCreateProps } from './types'

export default function TeacherUserCreate({ teacher }: TeacherUserCreateProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'post',
    route: 'admin.teachers.users.store',
    params: { teacher },
  })

  const title = `${titles.create} - ${teacher.name}`

  return (
    <AuthLayout
      title={titles.create}
      breadcrumb={breadcrumbs.create}
    >
      <PageHeader>
        <PageHeader.Title text={title} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <UserFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </AuthLayout>
  )
}
