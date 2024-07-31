import { Check } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import GroupFormData from './Partials/GroupFormData'
import { breadcrumbs, titles } from './data'

export default function PageGroupCreate({ flash }) {
  const formOptions = { method: 'POST', route: 'admin.groups.store' }
  const { handleSubmit, isLoading, errors } = useFormHandler(formOptions)

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        {/* Mensagem flash */}
        {!!flash.message && (
          <Alert
            color='success'
            icon={Check}
            onDismiss
          >
            <div>{flash.message}</div>
            <Alert.Link href={flash.link}>Clique aqui para vê-la.</Alert.Link>
          </Alert>
        )}

        {/* header teacher */}
        <Form.Header>
          <Form.Title title={titles.create} />
        </Form.Header>

        {/* form */}
        <GroupFormData errors={errors} />

        {/* footer teacher */}
        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </section>
  )
}

//
PageGroupCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
