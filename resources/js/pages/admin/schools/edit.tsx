import { Form } from '@inertiajs/react'
import { Head } from '@inertiajs/react'

import { PageContainer } from '@/components/page-container'
import { PageHeader } from '@/components/page-header'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import AppLayout from '@/layouts/app-layout'
import {
  index as indexSchool,
  update as schoolUpdate,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

import { SchoolFormFields } from './_partials/school-form-fields'

import type { BreadcrumbItem, PageInfo } from '@/types'
import type { App } from '@/wayfinder/types'

interface Props {
  school: App.Models.School
}

export default function SchoolEdit({ school }: Props) {
  const pageInfo: PageInfo = {
    title: `Editar: ${school.short_name}`,
    description: 'Atualize os dados da escola abaixo.',
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Escolas', href: indexSchool() },
    { title: 'Editar', href: '#' },
  ]

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Editar — ${school.short_name}`} />

      <PageContainer>
        <PageHeader title={pageInfo.title} description={pageInfo.description} />

        <Form action={schoolUpdate(school.id)}>
          {({ processing }) => (
            <FieldGroup className='w-full max-w-lg'>
              <SchoolFormFields data={school} />

              <Field orientation='horizontal'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => history.back()}
                >
                  Cancelar
                </Button>

                <SubmitButton
                  text='Salvar alterações'
                  loadingText='Salvando...'
                  disabled={processing}
                />
              </Field>
            </FieldGroup>
          )}
        </Form>
      </PageContainer>
    </AppLayout>
  )
}
