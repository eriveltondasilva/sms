import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'

import { breadcrumbs, titles } from './data'
import type { TeacherCreateProps } from './types'

export default function TeacherCreate({ flash, oldInput }: TeacherCreateProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'post',
    route: 'admin.teachers.store',
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
          {flash?.message}
          <Alert.Link href={flash.link || ''}>
            Clique aqui para vê-lo.
          </Alert.Link>
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title text={titles.create} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <TeacherFormData
          data={oldInput}
          errors={errors}
        />
        <AddressFormData
          data={oldInput}
          errors={errors}
        />

        <Form.Footer>
          <Form.ButtonReset disabled={isLoading} />
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </AuthLayout>
  )
}
