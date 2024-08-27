import { Badge, Button } from 'flowbite-react'
import { AlertCircle, Check } from 'lucide-react'
import { useState } from 'react'

import { Alert } from '@/Components/Alert'
import { Form } from '@/Components/Form'
import { PageHeader } from '@/Components/PageHeader'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import type { PageProps, SchoolYear } from '@/Types'

import SchoolYearFormData from './Partials/SchoolYearFormData'
import SchoolYearModel from './Partials/SchoolYearModel'
import { breadcrumbs, titles } from './data'

type PageSchoolYearEditProps = {
  schoolYear: SchoolYear
}

export default function PageSchoolYearEdit({
  schoolYear,
  flash,
}: PageProps<PageSchoolYearEditProps>) {
  const [showModel, setShowModel] = useState(false)

  const { handleSubmit, errors, isLoading } = useFormHandler({
    method: 'put',
    route: 'admin.school-years.update',
    params: { schoolYear },
  })

  return (
    <AuthLayout title={titles.edit} breadcrumb={breadcrumbs.edit}>
      {!!flash.message && (
        <Alert color='success' icon={Check} onDismiss>
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
            color={schoolYear.is_active ? 'success' : 'gray'}
            className='text-lg'
            size='sm'
          >
            {schoolYear.is_active ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>

        {/* Academic year form data */}
        <SchoolYearFormData data={schoolYear} errors={errors} />

        {/* Form footer */}
        <Form.Footer>
          <Form.ButtonSubmit disabled={isLoading} />

          <Button
            color='failure'
            disabled={schoolYear.is_active}
            onClick={() => setShowModel(true)}
            className='uppercase'
            fullSized
          >
            <AlertCircle className='mr-2 size-5' />
            Ativar ano letivo
          </Button>
        </Form.Footer>
      </Form>

      <SchoolYearModel
        schoolYear={schoolYear}
        show={showModel}
        onClose={setShowModel}
      />
    </AuthLayout>
  )
}
