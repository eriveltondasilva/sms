import { Link, usePage } from '@inertiajs/react'
import { Badge, Button } from 'flowbite-react'
import { AlertCircle, Plus } from 'lucide-react'
import { useState } from 'react'

import Alert from '@/Components/Alert'
import Form from '@/Components/Form'

import useFormHandler from '@/Hooks/useFormHandler'
import AuthLayout from '@/Layouts/AuthLayout'

import AcademicYearFormData from './Partials/AcademicYearFormData'
import AcademicYearModel from './Partials/AcademicYearModel'
import { breadcrumbs, titles } from './data'

// ====================================
export default function PageAcademicYearEdit({ academicYear = {} }) {
  const { message } = usePage().props.flash || {}

  const [isShowed, setIsShowed] = useState(false)
  const handleToggleModal = () => setIsShowed(!isShowed)

  const formOptions = {
    method: 'PUT',
    route: 'admin.academic-years.update',
    params: { academicYear: academicYear.id },
  }
  const { handleSubmit, errors, isLoading } = useFormHandler(formOptions)

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* flash message */}
        {message && <Alert color='success'>{message}</Alert>}

        {/* Form header */}
        <Form.Header>
          <Form.HeaderTitle title={titles.edit} />
          <Button
            href={route('admin.academic-years.create')}
            color='blue'
            size='xs'
            as={Link}>
            <Plus className='h-4 w-4' />
          </Button>
        </Form.Header>

        {/* Academic year status */}
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
        <AcademicYearFormData {...{ data: academicYear, errors }} />

        {/* Form footer */}
        <Form.Footer className='flex flex-col'>
          <Form.FooterButtonSubmit disabled={isLoading} />
          <Button
            color='failure'
            disabled={academicYear.is_active}
            onClick={handleToggleModal}
            className='uppercase'
            fullSized>
            <AlertCircle className='mr-2 h-5 w-5' />
            Ativar ano letivo
          </Button>
        </Form.Footer>
      </Form>
      <AcademicYearModel {...{ academicYear, isShowed, handleToggleModal }} />
    </>
  )
}

// ==============================================
PageAcademicYearEdit.layout = (page) => (
  <AuthLayout
    title={titles.edit}
    breadcrumb={breadcrumbs.edit}
    children={page}
  />
)
