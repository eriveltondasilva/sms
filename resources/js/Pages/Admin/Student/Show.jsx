import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { PencilLine, Plus } from 'lucide-react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import StudentFormData from './Partials/StudentFormData'
import { breadcrumbs, titles } from './data'

export default function PageStudentShow({ student = {}, flash = {} }) {
  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.show} />
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
    </>
  )
}

PageStudentShow.layout = (page) => (
  <AuthLayout
    title={titles.show}
    breadcrumb={breadcrumbs.show}
    children={page}
  />
)
