import { Badge, Button } from 'flowbite-react'
import { AlertCircle, Check } from 'lucide-react'
import { useState } from 'react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'

import { useFormHandler } from '@/Hooks/useFormHandler'
import { AuthLayout } from '@/Layouts/AuthLayout'

import AcademicYearFormData from './Partials/AcademicYearFormData'
import AcademicYearModel from './Partials/AcademicYearModel'
import { breadcrumbs, titles } from './data'

//
export default function PageAcademicYearEdit({ academicYear = {}, flash }) {
  const [showModel, setShowModel] = useState(false)

  const formOptions = {
    method: 'PUT',
    route: 'admin.academic-years.update',
    params: { academicYear: academicYear.id },
  }
  const { handleSubmit, errors, isLoading } = useFormHandler(formOptions)

  return (
    <>
      {!!flash.message && (
        <Alert
          color='success'
          icon={Check}
          onDismiss>
          {flash.message}
        </Alert>
      )}

      <PageHeader>
        <PageHeader.Title title={titles.edit} />
      </PageHeader>

      <Form onSubmit={handleSubmit}>
        <div className='text-sm font-medium text-gray-900 dark:text-white'>
          Status do Ano Letivo
        </div>
        <div className='flex'>
          <Badge
            color={academicYear.is_active ? 'success' : 'gray'}
            className='text-lg'
            size='sm'>
            {academicYear.is_active ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>

        {/* Academic year form data */}
        <AcademicYearFormData
          data={academicYear}
          errors={errors}
        />

        {/* Form footer */}
        <Form.Footer className='flex flex-col'>
          <Form.ButtonSubmit disabled={isLoading} />
          <Button
            color='failure'
            disabled={academicYear.is_active}
            onClick={() => setShowModel(true)}
            className='uppercase'
            fullSized>
            <AlertCircle className='mr-2 size-5' />
            Ativar ano letivo
          </Button>
        </Form.Footer>
      </Form>
      <AcademicYearModel
        academicYear={academicYear}
        show={showModel}
        onClose={setShowModel}
      />
    </>
  )
}

PageAcademicYearEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
