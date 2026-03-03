import { Link } from '@inertiajs/react'
import { MoreHorizontalIcon } from 'lucide-react'

import { IconButton } from '@/components/icon-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  show as schoolShow,
  edit as schoolEdit,
} from '@/wayfinder/routes/admin/schools'

import type { School } from '../index'

export const actions = (school: School) => {
  //   const handleToggleActive = (school: School) => {
  //     router.post(
  //       schoolToggleActive(school.id),
  //       {},
  //       {
  //         preserveScroll: true,
  //       },
  //     )
  //   }

  //   const handleImpersonate = (school: School) => {
  //     router.post(ImpersonationStart(school.id), {})
  //   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          variant='outline'
          size='icon-sm'
          icon={MoreHorizontalIcon}
          label='Abrir menu'
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link href={schoolShow(school.id)}>Ver</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={schoolEdit(school.id)}>Editar</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
