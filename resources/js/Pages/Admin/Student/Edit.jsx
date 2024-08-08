import { Form } from '@/Components/Form'

import { PageHeader } from '@/Components/PageHeader'
import { useFormHandler } from '@/Hooks/useFormHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

export default function PageStudentEdit({ student = {} }) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.students.update',
    params: { student },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
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
    </>
  )
}

PageStudentEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
