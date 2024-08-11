import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import SchoolYearFormData from './Partials/SchoolYearFormData'
import { breadcrumbs, titles } from './data'

export default function PageSchoolYearCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.school-years.store' }
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
        <SchoolYearFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageSchoolYearCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
