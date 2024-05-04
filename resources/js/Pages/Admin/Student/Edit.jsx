import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageStudentEdit({ student = {} }) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.students.update',
    params: { student },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* header student */}
      <Form.Header>
        <Form.HeaderTitle title={titles.edit} />
      </Form.Header>

      {/* form student */}
      <StudentFormData {...{ data: student, errors }} />

      {/* footer student */}
      <Form.Footer>
        <Form.FooterButtonReset disabled={isLoading} />
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ==============================================
PageStudentEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
