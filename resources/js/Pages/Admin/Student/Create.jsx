import { usePage } from '@inertiajs/react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

export default function PageStudentCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.students.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  console.log(usePage()?.props)

  return (
    <>
      {!!flash.message && (
        <Alert>
          <div>{flash.message}</div>
          <Alert.Link href={flash.link}>Clique aqui para vê-lo.</Alert.Link>
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.create} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <StudentFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
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
