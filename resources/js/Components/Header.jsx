import { Link, router } from '@inertiajs/react'
import { useState } from 'react'

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react'
import { LogOut, Menu, UserRoundCog } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import { getRoleName } from '@/Utils/getRoleName'

//
function HeaderRoot({ children }) {
  return (
    <Navbar
      fluid
      rounded
      className={twJoin(
        'sticky top-0 z-10 rounded-lg',
        'shadow-lg sm:relative',
        'bg-slate-50 dark:text-white'
      )}>
      {children}
    </Navbar>
  )
}

function HeaderLeft({
  onCollapseSidebar,
  onOpenSidebar,
  username = 'Usuário',
}) {
  return (
    <Navbar.Brand>
      <button
        className='mr-2 hidden p-2 md:block'
        onClick={onCollapseSidebar}>
        <Menu />
      </button>
      <button
        className='mr-2 p-2 md:hidden'
        onClick={onOpenSidebar}>
        <Menu />
      </button>
      <div
        className={twJoin(
          'flex self-center whitespace-nowrap',
          'text-xl font-semibold dark:text-white'
        )}>
        <span className='hidden lg:flex'>Bem-vindo(a), {username}</span>
      </div>
    </Navbar.Brand>
  )
}

function HeaderRight({ activeYear = '0000', children }) {
  return (
    <div className='flex items-center space-x-2'>
      <div className='text-sm font-medium text-gray-600 dark:text-gray-400'>
        Ano Letivo: {activeYear}
      </div>

      {/* Botão tema escuro */}
      <DarkThemeToggle />
      {children}
    </div>
  )
}

function HeaderDropdown({ user = {} }) {
  const [isLoading, setIsLoading] = useState(false)
  const image_url =
    'https://flowbite.com/docs/images/people/profile-picture-5.jpg'

  const handleLogout = () => {
    setIsLoading(true)
    router.post(route('logout'), {
      onFinish: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    <Dropdown
      inline
      label={
        <Avatar
          alt='avatar do usuário'
          placeholderInitials={user?.username.slice(0, 1).toUpperCase()}
          img={user.avatar_url || image_url}
          rounded
        />
      }
      className='w-48'>
      <Dropdown.Header as='dl'>
        <dt className='block truncate text-sm font-semibold uppercase'>
          {getRoleName(user?.role)}
        </dt>
        <dd
          className='block truncate text-sm text-gray-400'
          title={user?.email || 'Email'}>
          {user?.email || 'exemplo@email.com'}
        </dd>
      </Dropdown.Header>
      <Dropdown.Item
        as={Link}
        href={route('profile.edit')}
        icon={UserRoundCog}>
        Perfil
      </Dropdown.Item>
      <Dropdown.Item
        as='button'
        method='post'
        disabled={isLoading}
        onClick={handleLogout}
        icon={LogOut}>
        Sair
      </Dropdown.Item>
    </Dropdown>
  )
}

//
export const Header = Object.assign(HeaderRoot, {
  Left: HeaderLeft,
  Right: HeaderRight,
  Dropdown: HeaderDropdown,
})
