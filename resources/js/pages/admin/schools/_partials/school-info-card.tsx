import { BuildingIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { formatCnpj } from '@/lib/formatter'

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
}

interface SchoolInfoCardProps {
  school: School
}

export function SchoolInfoCard({ school }: SchoolInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-start gap-3'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary'>
              <BuildingIcon className='size-5' />
            </div>
            <div>
              <CardTitle className='text-lg'>{school.full_name}</CardTitle>
              <CardDescription>{school.short_name}</CardDescription>
            </div>
          </div>
          <Badge variant={school.is_active ? 'default' : 'secondary'}>
            {school.is_active ? 'Ativa' : 'Inativa'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <dl className='grid gap-3 text-sm sm:grid-cols-2'>
          <div>
            <dt className='font-medium text-muted-foreground'>CNPJ</dt>
            <dd className='mt-1 font-mono'>{formatCnpj(school.cnpj)}</dd>
          </div>

          {school.inep_code && (
            <div>
              <dt className='font-medium text-muted-foreground'>Código INEP</dt>
              <dd className='mt-1 font-mono'>{school.inep_code}</dd>
            </div>
          )}

          {school.phone && (
            <div className='flex items-center gap-2'>
              <PhoneIcon className='size-4 text-muted-foreground' />
              <div>
                <dt className='sr-only'>Telefone</dt>
                <dd>{school.phone}</dd>
              </div>
            </div>
          )}

          {school.email && (
            <div className='flex items-center gap-2'>
              <MailIcon className='size-4 text-muted-foreground' />
              <div>
                <dt className='sr-only'>E-mail</dt>
                <dd className='truncate'>{school.email}</dd>
              </div>
            </div>
          )}

          {school.address && (
            <div className='col-span-full flex items-start gap-2'>
              <MapPinIcon className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
              <div>
                <dt className='sr-only'>Endereço</dt>
                <dd className='text-muted-foreground'>{school.address}</dd>
              </div>
            </div>
          )}

          {school.motto && (
            <div className='col-span-full border-t pt-3'>
              <dt className='font-medium text-muted-foreground'>Lema</dt>
              <dd className='mt-1 italic'>"{school.motto}"</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  )
}
