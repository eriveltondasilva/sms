import { Head, Link, router } from '@inertiajs/react'
import {
  BuildingIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'

import { DataPagination } from '@/components/data-pagination'
import Heading from '@/components/heading'
import { Icon } from '@/components/icon'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { formatCnpj } from '@/lib/formatter'
import { start as ImpersonationStart } from '@/wayfinder/App/Http/Controllers/Admin/ImpersonationController'
import {
  index as schoolIndex,
  show as schoolShow,
  toggleActive as schoolToggleActive,
  destroy as schoolDestroy,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

import { SchoolSheet } from './_partials/school-sheet'

import type { BreadcrumbItem, PaginatedData } from '@/types'

interface School {
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

interface Props {
  schools: PaginatedData<School>
  filters: { search?: string; status?: string }
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Escolas', href: '/admin/schools' },
]

export default function SchoolsIndex({ schools, filters }: Props) {
  const [search, setSearch] = useState(filters.search ?? '')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<School | null>(null)
  const [deletingSchool, setDeletingSchool] = useState<School | null>(null)

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

  const openCreate = () => {
    setEditingSchool(null)
    setSheetOpen(true)
  }

  const openEdit = (school: School) => {
    setEditingSchool(school)
    setSheetOpen(true)
  }

  const handleToggleActive = (school: School) => {
    router.post(
      schoolToggleActive(school.id),
      {},
      {
        preserveScroll: true,
      },
    )
  }

  const handleImpersonate = (school: School) => {
    router.post(ImpersonationStart(school.id), {})
  }

  const handleDeleteConfirm = () => {
    if (!deletingSchool) return
    router.delete(schoolDestroy(deletingSchool.id), {
      onFinish: () => setDeletingSchool(null),
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='Escolas' />

      <div className='space-y-6 p-6'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <Heading
            title='Escolas'
            description='Gerencie as escolas cadastradas no sistema'
          />
          <Button onClick={openCreate}>
            <Icon iconNode={PlusIcon} />
            Nova Escola
          </Button>
        </div>

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
          <Button type='submit' variant='secondary'>
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

        {/* Table */}
        <div className=''>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Escola</TableHead>
                <TableHead>CNPJ / E-mail</TableHead>
                <TableHead className='text-center'>Usuários</TableHead>
                <TableHead className='text-center'>Anos Letivos</TableHead>
                <TableHead className='text-center'>Alunos</TableHead>
                <TableHead className='text-center'>Status</TableHead>
                <TableHead className='w-10' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='py-16 text-center text-muted-foreground'
                  >
                    <BuildingIcon className='mx-auto mb-3 size-10 opacity-30' />
                    <p className='font-medium'>Nenhuma escola encontrada</p>
                    {filters.search && (
                      <p className='mt-1 text-sm'>
                        Tente ajustar os termos de busca
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              )}

              {schools.data.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>
                    <div>
                      <p className='font-medium'>{school.full_name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {school.short_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <p className='font-mono text-xs tracking-wider'>
                        {formatCnpj(school.cnpj)}
                      </p>
                      {school.email && (
                        <p className='text-muted-foreground'>{school.email}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    {school.users_count}
                  </TableCell>
                  <TableCell className='text-center'>
                    {school.school_years_count}
                  </TableCell>
                  <TableCell className='text-center'>
                    {school.students_count}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={school.is_active ? 'default' : 'secondary'}>
                      {school.is_active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='size-8 data-[state=open]:bg-accent'
                        >
                          <MoreHorizontalIcon className='size-4' />
                          <span className='sr-only'>Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem asChild>
                          <Link href={schoolShow(school.id)}>
                            <BuildingIcon className='mr-2 size-4' />
                            Ver detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEdit(school)}>
                          <PencilIcon className='mr-2 size-4' />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleImpersonate(school)}
                        >
                          <ShieldCheckIcon className='mr-2 size-4' />
                          Impersonar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(school)}
                        >
                          {school.is_active ? 'Desativar' : 'Ativar'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant='destructive'
                          onClick={() => setDeletingSchool(school)}
                        >
                          <Trash2Icon className='mr-2 size-4' />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DataPagination
          links={schools.links}
          from={schools.from}
          to={schools.to}
          total={schools.total}
        />
      </div>

      {/* Sheet create/edit */}
      <SchoolSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        school={editingSchool}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deletingSchool}
        onOpenChange={(open) => !open && setDeletingSchool(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir escola?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir{' '}
              <strong>{deletingSchool?.full_name}</strong>? Esta ação é
              irreversível. Escolas com alunos cadastrados não podem ser
              excluídas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
              onClick={handleDeleteConfirm}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  )
}
