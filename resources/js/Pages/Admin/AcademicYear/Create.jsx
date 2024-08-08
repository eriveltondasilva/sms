import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import AcademicYearFormData from './Partials/AcademicYearFormData'
import { breadcrumbs, titles } from './data'

export default function PageAcademicYearCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.academic-years.store' }
  const { handleSubmit, errors, isLoading } = useFormHandler(formOptions)

  return (
    <>
      {!!flash.message && (
        <Alert
          icon={Check}
          color='success'
          onDismiss>
          <div>{flash.message}</div>
          <Alert.Link href={flash.link}>Clique aqui para vê-lo.</Alert.Link>
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.create} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <AcademicYearFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageAcademicYearCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
