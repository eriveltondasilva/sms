import { Link, usePage } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Plus } from 'lucide-react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import GroupFormData from './Partials/GroupFormData'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageGroupEdit({ group = {} }) {
  const { message } = usePage().props.flash || {}

  const formOptions = {
    method: 'PUT',
    route: 'admin.groups.update',
    params: { group: group.id },
  }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <Form onSubmit={handleSubmit}>
      {/* Mensagem flash */}
      {message && <Alert color='success'>{message}</Alert>}

      {/* Form header */}
      <Form.Header>
        <Form.HeaderTitle title={titles.edit} />
        <Button
          href={route('admin.groups.create')}
          color='blue'
          size='xs'
          title='Cadastrar novo turma'
          as={Link}>
          <Plus className='h-4 w-4' />
        </Button>
      </Form.Header>

      {/* Formulário */}
      <GroupFormData {...{ data: group, errors }} />

      {/*  */}
      <Form.Footer>
        <Form.FooterButtonSubmit disabled={isLoading} />
      </Form.Footer>
    </Form>
  )
}

// ==============================================
PageGroupEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
