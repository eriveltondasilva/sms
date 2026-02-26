import { UserIcon } from 'lucide-react'

import { DataPagination } from '@/components/data-pagination'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useInitials } from '@/hooks/use-initials'

import type { PaginatedData } from '@/types/pagination'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Role {
  id: number
  name: string
  label: string | null
  color: string | null
}

interface User {
  id: number
  name: string
  email: string
  is_active: boolean
  last_login_at: string | null
  roles: Role[]
}

interface SchoolUsersTableProps {
  users: PaginatedData<User>
}

function formatDate(date: string | null): string {
  if (!date) return 'Nunca'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function SchoolUsersTable({ users }: SchoolUsersTableProps) {
  const getInitials = useInitials()

  return (
    <div className='space-y-4'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Último acesso</TableHead>
              <TableHead className='text-center'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='py-12 text-center text-muted-foreground'
                >
                  <UserIcon className='mx-auto mb-2 size-8 opacity-30' />
                  <p>Nenhum usuário cadastrado nesta escola</p>
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
                      <p className='font-medium'>{user.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-wrap gap-1'>
                    {user.roles.map((role) => (
                      <Badge
                        key={role.id}
                        variant='outline'
                        className='text-xs'
                      >
                        {role.label ?? role.name}
                      </Badge>
                    ))}
                    {user.roles.length === 0 && (
                      <span className='text-sm text-muted-foreground'>
                        Sem perfil
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {formatDate(user.last_login_at)}
                </TableCell>
                <TableCell className='text-center'>
                  <Badge variant={user.is_active ? 'default' : 'secondary'}>
                    {user.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
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
  )
}
