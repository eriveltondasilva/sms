import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Plus } from 'lucide-react'

import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import AddressFormData from './Partials/AddressFormData'
import TeacherFormData from './Partials/TeacherFormData'

import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageTeacherEdit({ teacher = {} }) {
  const formOptions = {
    method: 'PUT',
    route: 'admin.teachers.update',
    params: { teacher },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* header teacher */}
      <Form.Header>
        <Form.HeaderTitle title={titles.edit} />
        <Button
          color='red'
          size='xs'
          className='uppercase'
          as={Link}
          href={route('admin.teachers.users.create', { teacher })}>
          <Plus className='mr-1 h-4 w-4' />
          usuário
        </Button>
      </Form.Header>

      {/* form */}
      <TeacherFormData {...{ data: teacher, errors }} />

      {/* address teacher */}
      <AddressFormData {...{ data: teacher, errors }} />

      {/* footer teacher */}
      <Form.Footer>
        <Form.FooterButtonReset disabled={isLoading} />
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ==============================================
PageTeacherEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
