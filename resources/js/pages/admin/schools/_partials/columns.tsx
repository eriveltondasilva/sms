import { Badge } from '@/components/ui/badge'
import { formatCnpj } from '@/lib/formatter'

import type { School } from '../index'
import type { DataTableColumn } from '@/types'

export const columns: DataTableColumn<School>[] = [
  {
    header: 'Escola',
    renderCell: (school) => (
      <>
        <p className='font-medium'>{school.full_name}</p>
        <p className='text-sm text-muted-foreground'>{school.short_name}</p>
      </>
    ),
  },
  {
    header: 'CNPJ / E-mail',
    renderCell: (school) => (
      <>
        <p className='font-mono tracking-wider'>{formatCnpj(school.cnpj)}</p>
        {school.email && (
          <p className='text-muted-foreground'>{school.email}</p>
        )}
      </>
    ),
  },
  {
    header: 'Anos Letivos',
    className: 'hidden lg:table-cell text-center',
    cellClassName: 'font-mono tracking-wider',
    renderCell: (school) => school.school_years_count,
  },
  {
    header: 'Usuários',
    className: 'hidden lg:table-cell text-center',
    cellClassName: 'font-mono tracking-wider',
    renderCell: (school) => school.users_count,
  },
  {
    header: 'Alunos',
    className: 'hidden lg:table-cell text-center',
    cellClassName: 'font-mono tracking-wider',
    renderCell: (school) => school.students_count,
  },
  {
    header: 'Professores',
    className: 'hidden lg:table-cell text-center',
    cellClassName: 'font-mono tracking-wider',
    renderCell: (school) => school.teachers_count,
  },
  {
    header: 'Status',
    className: 'text-center',
    renderCell: (school) => (
      <Badge variant={school.is_active ? 'default' : 'secondary'}>
        {school.is_active ? 'Ativa' : 'Inativa'}
      </Badge>
    ),
  },
]
