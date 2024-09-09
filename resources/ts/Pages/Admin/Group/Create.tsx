import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import GroupFormData from './Partials/GroupFormData'

import { breadcrumbs, titles } from './data'
import type { GroupCreateProps } from './types'

export default function GroupCreate({ flash }: GroupCreateProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'post',
    route: 'admin.groups.store',
  })

  return (
    <AuthLayout
      title={titles.create}
      breadcrumb={breadcrumbs.create}
    >
      {flash?.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss
        >
          <div>{flash?.message}</div>
          <Alert.Link href={flash.link || ''}>
            Clique aqui para vê-la.
          </Alert.Link>
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
    </AuthLayout>
  )
}
