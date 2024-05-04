import { Link, usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import GroupFormData from './Partials/GroupFormData'
import { breadcrumbs, titles } from './data'

// ===============================================
export default function PageGroupCreate() {
  const { message, groupId } = usePage().props.flash || {}

  const formOptions = { method: 'POST', route: 'admin.groups.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        {/* Mensagem flash */}
        {message && (
          <Alert color='success'>
            <div>{message}</div>
            <Link
              href={route('admin.groups.edit', { group: groupId })}
              className='font-medium underline'>
              Clique aqui para vê-lo.
            </Link>
          </Alert>
        )}

        {/* header teacher */}
        <Form.Header>
          <Form.HeaderTitle title={titles.create} />
        </Form.Header>

        {/* form */}
        <GroupFormData {...{ errors }} />

        {/* footer teacher */}
        <Form.Footer>
          <Form.FooterButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </section>
  )
}

// ==============================================
PageGroupCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
