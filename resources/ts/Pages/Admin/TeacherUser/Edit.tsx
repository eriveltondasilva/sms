import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'
import type { PageProps, Teacher, User } from '@/Types'

import UserFormData from './Partials/UserFormData'
import { breadcrumbs, titles } from './data'

type PageTeacherUserEditProps = {
  teacher: Teacher
  user: User
}

export default function PageTeacherUserEdit({
  teacher,
  user,
  flash,
}: PageProps<PageTeacherUserEditProps>) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'put',
    route: 'admin.teachers.users.update',
    params: { teacher, user },
  })

  const title = `${titles.edit} - ${teacher.name}`

  return (
    <AuthLayout title={titles.edit} breadcrumb={breadcrumbs.edit}>
      {!!flash.message && (
        <Alert color='success' icon={Check} onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={title} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <UserFormData data={user} errors={errors} />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </AuthLayout>
  )
}
