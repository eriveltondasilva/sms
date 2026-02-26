import { Head, router } from '@inertiajs/react'
import {
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react'
import { useState } from 'react'

import { DataPagination } from '@/components/data-pagination'
import Heading from '@/components/heading'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { useInitials } from '@/hooks/use-initials'
import AppLayout from '@/layouts/app-layout'
import { formatDate } from '@/lib/formatter'
import {
  index as userIndex,
  destroy as userDestroy,
} from '@/wayfinder/App/Http/Controllers/Admin/UserController'

import { UserSheet } from './_partials/user-sheet'

import type { BreadcrumbItem } from '@/types'
import type { PaginatedData } from '@/types/pagination'
import type { App } from '@/wayfinder/types'

interface Props {
  users: PaginatedData<App.Models.User>
  filters: { search?: string }
  currentUser: number
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Super Admins', href: '/admin/users' },
]

export default function UsersIndex({ users, filters, currentUser }: Props) {
  const getInitials = useInitials()
  const [search, setSearch] = useState(filters.search ?? '')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<App.Models.User | null>(null)
  const [deletingUser, setDeletingUser] = useState<App.Models.User | null>(null)

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault()
    router.get(
      userIndex(),
      { search: search || undefined },
      { preserveState: true, replace: true },
    )
  }

  const handleClearSearch = () => {
    setSearch('')
    router.get(userIndex(), {}, { replace: true })
  }

  const openCreate = () => {
    setEditingUser(null)
    setSheetOpen(true)
  }

  const openEdit = (user: App.Models.User) => {
    setEditingUser(user)
    setSheetOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (!deletingUser) return
    router.delete(userDestroy(deletingUser.id), {
      onFinish: () => setDeletingUser(null),
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title='Super Admins' />

      <div className='space-y-6 p-6'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <Heading
            title='Super Admins'
            description='Usuários com acesso irrestrito ao sistema'
          />
          <Button onClick={openCreate}>
            <PlusIcon className='mr-2 size-4' />
            Novo usuário
          </Button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className='flex gap-2'>
          <div className='relative max-w-sm flex-1'>
            <SearchIcon className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Buscar por nome ou e-mail...'
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
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Último acesso</TableHead>
                <TableHead className='text-center'>Status</TableHead>
                <TableHead className='w-10' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='py-16 text-center text-muted-foreground'
                  >
                    <ShieldIcon className='mx-auto mb-3 size-10 opacity-30' />
                    <p className='font-medium'>Nenhum usuário encontrado</p>
                  </TableCell>
                </TableRow>
              )}

              {users.data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-8'>
                        <AvatarFallback className='text-xs'>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{user.name}</p>
                          {user.id === currentUser && (
                            <Badge variant='outline' className='text-xs'>
                              Você
                            </Badge>
                          )}
                        </div>
                        <p className='text-xs text-muted-foreground'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='border-red-200 text-red-700 dark:border-red-800 dark:text-red-400'
                    >
                      <ShieldIcon className='mr-1 size-3' />
                      Super Admin
                    </Badge>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatDate(user.last_login_at)}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Badge variant={user.is_active ? 'default' : 'secondary'}>
                      {user.is_active ? 'Ativo' : 'Inativo'}
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
                        <DropdownMenuItem onClick={() => openEdit(user)}>
                          <PencilIcon className='mr-2 size-4' />
                          Editar
                        </DropdownMenuItem>
                        {user.id !== currentUser && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant='destructive'
                              onClick={() => setDeletingUser(user)}
                            >
                              <Trash2Icon className='mr-2 size-4' />
                              Excluir
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DataPagination
          links={users.links}
          from={users.from}
          to={users.to}
          total={users.total}
        />
      </div>

      {/* Sheet */}
      <UserSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        user={editingUser}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir{' '}
              <strong>{deletingUser?.name}</strong>? Esta ação é irreversível.
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
