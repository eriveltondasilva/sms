import { CalendarIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface SchoolYear {
  id: number
  year: number
  status: 'planning' | 'in_progress' | 'closed'
  total_school_days: number
  total_school_hours: number
  created_at: string
}

interface SchoolYearsTableProps {
  schoolYears: SchoolYear[]
}

const statusConfig = {
  planning: { label: 'Planejamento', variant: 'secondary' as const },
  in_progress: { label: 'Em andamento', variant: 'default' as const },
  closed: { label: 'Finalizado', variant: 'outline' as const },
}

export function SchoolYearsTable({ schoolYears }: SchoolYearsTableProps) {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ano</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-center'>Dias letivos</TableHead>
            <TableHead className='text-center'>Carga horária</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schoolYears.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className='py-12 text-center text-muted-foreground'
              >
                <CalendarIcon className='mx-auto mb-2 size-8 opacity-30' />
                <p>Nenhum ano letivo cadastrado</p>
              </TableCell>
            </TableRow>
          )}

          {schoolYears.map((year) => {
            const config = statusConfig[year.status]
            return (
              <TableRow key={year.id}>
                <TableCell className='font-medium'>{year.year}</TableCell>
                <TableCell>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </TableCell>
                <TableCell className='text-center'>
                  {year.total_school_days} dias
                </TableCell>
                <TableCell className='text-center'>
                  {year.total_school_hours}h
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
