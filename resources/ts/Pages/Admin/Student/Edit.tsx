import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import StudentFormData from './Partials/StudentFormData'

import { breadcrumbs, titles } from './data'
import type { StudentEditProps } from './types'

export default function StudentEdit({ student }: StudentEditProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'put',
    route: 'admin.students.update',
    params: { student },
  })

  return (
    <AuthLayout
      title={titles.edit}
      breadcrumb={breadcrumbs.edit}
    >
      <PageHeader>
        <PageHeader.Title title={titles.edit} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <StudentFormData
          errors={errors}
          data={student}
        />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </AuthLayout>
  )
}
