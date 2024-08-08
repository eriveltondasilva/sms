import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'
import { breadcrumbs, titles } from './data'

export default function PageTeacherCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.teachers.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss>
          {flash.message}
          <Alert.Link href={flash.link}>Clique aqui para vê-lo.</Alert.Link>
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.create} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <TeacherFormData errors={errors} />

        <AddressFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageTeacherCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
