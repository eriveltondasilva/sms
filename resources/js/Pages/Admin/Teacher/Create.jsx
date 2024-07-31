import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import { Check } from 'lucide-react'
import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'
import { breadcrumbs, titles } from './data'

//
export default function PageTeacherCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.teachers.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* flash message */}
        {!!flash.message && (
          <Alert
            color='success'
            icon={Check}
            onDismiss
          >
            <div>{flash.message}</div>
            <Alert.Link href={flash.link}>Clique aqui para vê-lo.</Alert.Link>
          </Alert>
        )}

        {/* header teacher */}
        <Form.Header>
          <Form.Title title={titles.create} />
        </Form.Header>

        {/* form */}
        <TeacherFormData errors={errors} />

        {/* address teacher */}
        <AddressFormData errors={errors} />

        {/* footer teacher */}
        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

//
PageTeacherCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
