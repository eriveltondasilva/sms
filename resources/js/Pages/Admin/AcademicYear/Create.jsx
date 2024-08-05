import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import { useFormHandler } from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import AcademicYearFormData from './Partials/AcademicYearFormData'
import { breadcrumbs, titles } from './data'

//
export default function PageAcademicYearCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.academic-years.store' }
  const { handleSubmit, errors, isLoading } = useFormHandler(formOptions)

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        {/* Mensagem flash */}
        {!!flash.message && (
          <Alert
            icon={Check}
            color='success'
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

        {/* Academic year form data */}
        <AcademicYearFormData errors={errors} />

        {/* Form footer */}
        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </section>
  )
}

//
PageAcademicYearCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
