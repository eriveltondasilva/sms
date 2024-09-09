import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import GroupFormData from './Partials/GroupFormData'

import { breadcrumbs, titles } from './data'
import type { GroupEditProps } from './types'

export default function GroupEdit({ group, flash }: GroupEditProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'put',
    route: 'admin.groups.update',
    params: { group },
  })

  return (
    <AuthLayout
      title={titles.edit}
      breadcrumb={breadcrumbs.edit}
    >
      {flash?.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss
        >
          {flash?.message}
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
    </AuthLayout>
  )
}
