import { Check, PencilLine } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'

import { breadcrumbs, titles } from './data'
import type { TeacherShowProps } from './types'

export default function TeacherShow({ teacher, flash }: TeacherShowProps) {
  return (
    <AuthLayout
      title={titles.show}
      breadcrumb={breadcrumbs.show}
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
        <PageHeader.Title title={titles.show} />
        <PageHeader.Button href={route('admin.teachers.edit', { teacher })}>
          <PencilLine className='mr-1 size-5' />
          Editar
        </PageHeader.Button>
      </PageHeader>

      <Form>
        <TeacherFormData
          data={teacher}
          readOnly
        />
        <AddressFormData
          data={teacher}
          readOnly
        />
      </Form>
    </AuthLayout>
  )
}
