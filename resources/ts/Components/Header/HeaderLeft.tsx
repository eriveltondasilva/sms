import { Navbar } from 'flowbite-react'
import { Menu } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

type HeaderLeftProps = {
  onCollapseSidebar: () => void
  onOpenSidebar: () => void
  username?: string
}

export function HeaderLeft({
  onCollapseSidebar,
  onOpenSidebar,
  username = 'Usuário',
}: HeaderLeftProps) {
  return (
    <Navbar.Brand>
      <button
        className='mr-2 hidden p-2 md:block'
        onClick={onCollapseSidebar}
      >
        <Menu />
      </button>
      <button
        className='mr-2 p-2 md:hidden'
        onClick={onOpenSidebar}
      >
        <Menu />
      </button>
      <div
        className={twJoin(
          'flex self-center whitespace-nowrap',
          'text-xl font-semibold dark:text-white',
        )}
      >
        <span className='hidden lg:flex'>Bem-vindo(a), {username}</span>
      </div>
    </Navbar.Brand>
  )
}
