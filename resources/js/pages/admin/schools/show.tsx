import { Head, router } from '@inertiajs/react'
import {
  PencilIcon,
  ShieldCheckIcon,
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  BookOpenIcon,
} from 'lucide-react'
import { useState } from 'react'

import Heading from '@/components/heading'
import { Icon } from '@/components/icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AppLayout from '@/layouts/app-layout'
import { start as impersonate } from '@/wayfinder/App/Http/Controllers/Admin/ImpersonationController'
import {
  index as indexSchool,
  show as showSchool,
} from '@/wayfinder/App/Http/Controllers/Admin/SchoolController'

import { SchoolInfoCard } from './_partials/school-info-card'
import { SchoolSheet } from './_partials/school-sheet'
import { SchoolUsersTable } from './_partials/school-users-table'
import { SchoolYearsTable } from './_partials/school-years-table'

import type { BreadcrumbItem } from '@/types'
import type { PaginatedData } from '@/types/pagination'

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
}

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

interface SchoolYear {
  id: number
  year: number
  status: 'planning' | 'in_progress' | 'closed'
  total_school_days: number
  total_school_hours: number
  created_at: string
}

interface Props {
  school: School
  users: PaginatedData<User>
  schoolYears: SchoolYear[]
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card>
      <CardContent className='flex items-center gap-3 p-4'>
        <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted'>
          <Icon className='size-4 text-muted-foreground' />
        </div>
        <div>
          <p className='text-2xl leading-none font-semibold'>{value}</p>
          <p className='mt-1 text-xs text-muted-foreground'>{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SchoolsShow({ school, users, schoolYears }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Escolas', href: indexSchool() },
    { title: school.short_name, href: showSchool(school.id) },
  ]

  const handleImpersonate = () => {
    router.post(impersonate(school.id).url, {})
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={school.short_name} />

      <div className='space-y-6 p-6'>
        {/* Page header */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-center gap-3'>
            <Heading
              title={school.full_name}
              description={school.is_active ? 'Escola ativa' : 'Escola inativa'}
            />
          </div>

          <div className='flex shrink-0 gap-2'>
            <Button variant='outline' onClick={() => setSheetOpen(true)}>
              <Icon iconNode={PencilIcon} />
              Editar
            </Button>
            <Button onClick={handleImpersonate}>
              <Icon iconNode={ShieldCheckIcon} />
              Impersonar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <StatCard
            icon={UsersIcon}
            label='Usuários'
            value={school.users_count}
          />
          <StatCard
            icon={CalendarIcon}
            label='Anos letivos'
            value={school.school_years_count}
          />
          <StatCard
            icon={GraduationCapIcon}
            label='Alunos'
            value={school.students_count}
          />
          <StatCard
            icon={BookOpenIcon}
            label='Professores'
            value={school.teachers_count}
          />
        </div>

        {/* Info card */}
        <SchoolInfoCard school={school} />

        {/* Tabs */}
        <Tabs defaultValue='users'>
          <TabsList>
            <TabsTrigger value='users'>
              Usuários
              <Badge variant='secondary' className='ml-2'>
                {school.users_count}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value='years'>
              Anos Letivos
              <Badge variant='secondary' className='ml-2'>
                {school.school_years_count}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='users' className='mt-4'>
            <SchoolUsersTable users={users} />
          </TabsContent>

          <TabsContent value='years' className='mt-4'>
            <SchoolYearsTable schoolYears={schoolYears} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit sheet */}
      <SchoolSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        school={school}
      />
    </AppLayout>
  )
}
