import { Head, router } from '@inertiajs/react'
import { PlusIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { DataPagination } from '@/components/data-pagination'
import { DataTable } from '@/components/data-table'
import { Icon } from '@/components/icon'
import { LinkButton } from '@/components/link-button'
import { PageContainer } from '@/components/page-container'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useInertiaLoading } from '@/hooks/use-inertia-loading'
import AppLayout from '@/layouts/app-layout'
import {
  index as schoolIndex,
  create as schoolCreate,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

import { actions } from './_partials/actions'
import { columns } from './_partials/columns'

import type { BreadcrumbItem, PageInfo, PaginatedData } from '@/types'

export interface School {
  id: number
  full_name: string
  short_name: string
  motto: string | null
  inep_code: string | null
  cnpj: string
  phone: string | null
  email: string | null
  address: string | null
  is_active: boolean
  users_count: number
  school_years_count: number
  students_count: number
  teachers_count: number
  created_at: string
}

interface Filters {
  search: string
  status: string
}

interface Props {
  schools: PaginatedData<School>
  filters: Partial<Filters>
}

const pageInfo: PageInfo = {
  title: 'Escolas',
  description: 'Gerencie as escolas cadastradas no sistema',
}

const breadcrumbs: BreadcrumbItem[] = [{ title: pageInfo.title, href: '#' }]

export default function SchoolsIndex({ schools, filters }: Props) {
  const [search, setSearch] = useState(filters.search ?? '')
  const isLoading = useInertiaLoading()

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault()
    router.get(
      schoolIndex(),
      { search: search || undefined },
      { preserveState: true, replace: true },
    )
  }

  const handleClearSearch = () => {
    setSearch('')
    router.get(schoolIndex(), {}, { replace: true })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={pageInfo.title} />

      <PageContainer>
        {/* Header */}
        <PageHeader
          title={pageInfo.title}
          description={pageInfo.description}
          actions={
            <LinkButton href={schoolCreate()}>
              <Icon iconNode={PlusIcon} />
              Nova Escola
            </LinkButton>
          }
        />

        {/* <SearchBar /> */}

        {/* <TableSearch /> */}

        {/* Search */}
        <form onSubmit={handleSearch} className='flex gap-2'>
          <div className='relative max-w-sm flex-1'>
            <SearchIcon className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Buscar por nome ou CNPJ...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-9'
            />
          </div>
          <Button type='submit' variant='secondary' disabled={isLoading}>
            Buscar
          </Button>
          {filters.search && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={handleClearSearch}
            >
              <XIcon className='size-4' />
            </Button>
          )}
        </form>

        <DataTable
          columns={columns}
          items={schools.data}
          actions={actions}
          isLoading={isLoading}
          empty='Nenhuma escola encontrada'
        />

        <DataPagination data={schools} />
      </PageContainer>
    </AppLayout>
  )
}
