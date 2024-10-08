import { PencilLine } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'

import { breadcrumbs, titles } from './data'
import type { StudentShowProps } from './types'

export default function StudentShow({ student, flash }: StudentShowProps) {
  return (
    <AuthLayout
      title={titles.show}
      breadcrumb={breadcrumbs.show}
    >
      {flash?.message && (
        <Alert
          color='success'
          onDismiss
        >
          {flash?.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title text={titles.show} />
        <PageHeader.Button href={route('admin.students.edit', { student })}>
          <PencilLine className='mr-1 size-5' />
          Editar
        </PageHeader.Button>
      </PageHeader>

      <Form>
        <StudentFormData
          data={student}
          readOnly
        />
      </Form>
    </AuthLayout>
  )
}
