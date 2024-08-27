import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import type { PageProps, Teacher } from '@/Types'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

type PageTeacherUserCreateProps = {
  teacher: Teacher
}
export default function PageTeacherUserCreate({
  teacher,
}: PageProps<PageTeacherUserCreateProps>) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'post',
    route: 'admin.teachers.users.store',
    params: { teacher },
  })

  const title = `${titles.create} - ${teacher.name}`

  return (
    <AuthLayout title={titles.create} breadcrumb={breadcrumbs.create}>
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
    </AuthLayout>
  )
}
