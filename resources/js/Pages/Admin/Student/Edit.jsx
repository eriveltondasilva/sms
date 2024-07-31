import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

//
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
        <Form.Title title={titles.edit} />
      </Form.Header>

      {/* form student */}
      <StudentFormData
        errors={errors}
        data={student}
      />

      {/* footer student */}
      <Form.Footer>
        <Form.ButtonReset disabled={isLoading} />
        <Form.ButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

//
PageStudentEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
