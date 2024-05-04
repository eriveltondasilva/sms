import { Link, router } from '@inertiajs/react'
import { Avatar, Dropdown } from 'flowbite-react'
import { LogOut, UserRoundCog } from 'lucide-react'
import { useState } from 'react'

// ==============================================
export function HeaderDropdown({ avatar_url = '', children }) {
  const image_url =
    'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
  const DropdownAvatar = (
    <Avatar alt='User settings' img={avatar_url || image_url} rounded />
  )

  return (
    <>
      {/* Trigger */}
      <Dropdown inline label={DropdownAvatar} className='w-48'>
        {children}
      </Dropdown>
    </>
  )
}

// ----------------------------------------------
export function HeaderDropdownHeader({ role, email }) {
  return (
    <Dropdown.Header>
      <span className='block truncate text-sm font-semibold uppercase'>
        {role || 'Usuário'}
      </span>
      <span
        className='block truncate text-sm text-gray-400'
        title={email || 'Email'}>
        {email || 'exemplo@email.com'}
      </span>
    </Dropdown.Header>
  )
}

// ----------------------------------------------
export function HeaderDropdownItem() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    return await router.post(route('logout'), {
      onFinish: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    <>
      <Dropdown.Item as={Link} href={route('profile.edit')} icon={UserRoundCog}>
        Perfil
      </Dropdown.Item>
      <Dropdown.Item
        as='button'
        method='POST'
        disabled={isLoading}
        onClick={handleLogout}
        icon={LogOut}>
        Sair
      </Dropdown.Item>
    </>
  )
}
