import { Link } from '@inertiajs/react'
import { Avatar, Dropdown } from 'flowbite-react'
import { LogOut, UserRoundCog } from 'lucide-react'

import { useActionHandler } from '@/Hooks/useActionHandler'
import { getRoleName } from '@/Utils/getRoleName'

import type { HeaderDropdownProps } from './types'

export function HeaderDropdown({ user }: HeaderDropdownProps) {
  const image_url =
    'https://flowbite.com/docs/images/people/profile-picture-5.jpg'

  const { handleAction: handleLogoutAction, isLoading } = useActionHandler({
    route: 'logout',
    method: 'post',
  })

  return (
    <Dropdown
      className='w-48'
      label={
        <Avatar
          alt='foto do usuário'
          placeholderInitials={user.username.at(0)?.toUpperCase()}
          img={user.avatar_url || image_url}
          rounded
        />
      }
      inline
    >
      <Dropdown.Header>
        <span className='block truncate text-sm font-semibold uppercase'>
          {getRoleName(user.role)}
        </span>
        <span
          className='block truncate text-sm text-gray-400'
          title={user.email || 'Email'}
        >
          {user.email || 'exemplo@email.com'}
        </span>
      </Dropdown.Header>
      <Dropdown.Item
        as={Link}
        href={route('profile.edit')}
        icon={UserRoundCog}
        disabled={isLoading}
      >
        Perfil
      </Dropdown.Item>
      <Dropdown.Item
        as='button'
        type='button'
        onClick={handleLogoutAction}
        icon={LogOut}
        disabled={isLoading}
      >
        Sair
      </Dropdown.Item>
    </Dropdown>
  )
}
