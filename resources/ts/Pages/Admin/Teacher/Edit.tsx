import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'

import { breadcrumbs, titles } from './data'
import type { TeacherEditProps } from './types'

export default function TeacherEdit({ teacher }: TeacherEditProps) {
  const { handleSubmit, isLoading, errors } = useFormHandler({
    method: 'put',
    route: 'admin.teachers.update',
    params: { teacher },
  })

  return (
    <AuthLayout
      title={titles.edit}
      breadcrumb={breadcrumbs.edit}
    >
      <PageHeader>
        <PageHeader.Title text={titles.edit} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <TeacherFormData
          data={teacher}
          errors={errors}
        />
        <AddressFormData
          data={teacher}
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
