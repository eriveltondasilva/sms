import { Form, Head } from '@inertiajs/react'
import { Undo2Icon } from 'lucide-react'

import { Icon } from '@/components/icon'
import { PageContainer } from '@/components/page-container'
import { PageHeader } from '@/components/page-header'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup } from '@/components/ui/field'
import AppLayout from '@/layouts/app-layout'
import {
  index as indexSchool,
  store as schoolStore,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

import { SchoolFormFields } from './_partials/school-form-fields'

import type { BreadcrumbItem, PageInfo } from '@/types'

const pageInfo: PageInfo = {
  title: 'Nova Escola',
  description: 'Preencha os dados para cadastrar uma nova escola.',
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Escolas', href: indexSchool() },
  { title: pageInfo.title, href: '#' },
]

export default function SchoolCreate() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={pageInfo.title} />

      <PageContainer>
        <PageHeader title={pageInfo.title} description={pageInfo.description} />

        <Form action={schoolStore()} resetOnSuccess>
          {({ processing }) => (
            <FieldGroup className='w-full max-w-lg'>
              <SchoolFormFields />

              <Field orientation='horizontal'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => history.back()}
                >
                  <Icon iconNode={Undo2Icon} />
                  Cancelar
                </Button>

                <SubmitButton
                  text='Criar escola'
                  loadingText='Criando...'
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
