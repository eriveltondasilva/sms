import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import GroupFormData from './Partials/GroupFormData'
import { breadcrumbs, titles } from './data'

export default function PageGroupEdit({ group = {}, flash = {} }) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.groups.update',
    params: { group: group.id },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.edit} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <GroupFormData
          data={group}
          errors={errors}
        />

        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </>
  )
}

//
PageGroupEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
