import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'

import { breadcrumbs, titles } from './data'

//
export default function PageStudentCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.students.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* flash message */}
      {!!flash.message && (
        <Alert>
          <div>{flash.message}</div>
          <Alert.Link href={flash.link}>Clique aqui para vê-lo.</Alert.Link>
        </Alert>
      )}

      {/* header student */}
      <Form.Header>
        <Form.Title title={titles.create} />
      </Form.Header>

      {/* form */}
      <StudentFormData errors={errors} />

      {/* footer student */}
      <Form.Footer>
        <Form.ButtonReset disabled={isLoading} />
        <Form.ButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

//
PageStudentCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
