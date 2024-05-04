import { Link, usePage } from '@inertiajs/react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import AcademicYearFormData from './Partials/AcademicYearFormData'
import { breadcrumbs, titles } from './data'

// ==============================================
export default function PageAcademicYearCreate() {
  const { message, academicYearId } = usePage().props.flash || {}

  const formOptions = { method: 'POST', route: 'admin.academic-years.store' }
  const { handleSubmit, errors, isLoading } = useFormHandler(formOptions)

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        {/* Mensagem flash */}
        {message && (
          <Alert color='success'>
            <div>{message}</div>
            <Link
              href={route('admin.academic-years.edit', {
                academicYear: academicYearId,
              })}
              className='font-medium underline'>
              Clique aqui para vê-lo.
            </Link>
          </Alert>
        )}

        {/* header teacher */}
        <Form.Header>
          <Form.HeaderTitle title={titles.create} />
        </Form.Header>

        {/* Academic year form data */}
        <AcademicYearFormData {...{ errors }} />

        {/* Form footer */}
        <Form.Footer>
          <Form.FooterButtonSubmit disabled={isLoading} />
        </Form.Footer>
      </Form>
    </section>
  )
}

// ==============================================
PageAcademicYearCreate.layout = (page) => (
  <AuthLayout
    title={titles.create}
    breadcrumb={breadcrumbs.create}
    children={page}
  />
)
