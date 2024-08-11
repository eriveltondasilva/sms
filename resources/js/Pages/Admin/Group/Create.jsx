import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import GroupFormData from './Partials/GroupFormData'
import { breadcrumbs, titles } from './data'

export default function PageGroupCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.groups.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss>
          <div>{flash.message}</div>
          <Alert.Link href={flash.link}>Clique aqui para vê-la.</Alert.Link>
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.create} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <GroupFormData errors={errors} />

        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

PageGroupCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
