import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Plus } from 'lucide-react'

import { Form } from '@/Components/Form'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'

import { PageHeader } from '@/Components/PageHeader'
import { breadcrumbs, titles } from './data'

//
export default function PageTeacherEdit({ teacher = {} }) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.teachers.update',
    params: { teacher },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <>
      <PageHeader>
        <PageHeader.Title title={titles.edit} />
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
    </>
  )
}

PageTeacherEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
