import { DarkThemeToggle, Navbar } from 'flowbite-react'
import { twJoin } from 'tailwind-merge'
import Sidebar from '../Sidebar'

// ====================================
export function HeaderRoot({ children }) {
  return (
    <Navbar
      fluid
      rounded
      className={twJoin(
        'sticky top-0 z-30 rounded-lg',
        'shadow-md sm:relative',
        'bg-slate-50 dark:text-white'
      )}>
      {children}
    </Navbar>
  )
}

// ====================================
export function HeaderLeft({ role = '' }) {
  return (
    <Navbar.Brand>
      {/* Botão de menu */}
      <Sidebar.TriggerOpen />

      {/* Título */}
      <div
        className={twJoin(
          'flex self-center whitespace-nowrap',
          'text-xl font-semibold dark:text-white'
        )}>
        <span className='hidden lg:flex'>Bem-vindo(a),&nbsp;</span>
        <span>{role || 'Usuário'}</span>
      </div>
    </Navbar.Brand>
  )
}

// ====================================
export function HeaderRight({ activeYear = '', children }) {
  return (
    <div className='mr-2 flex items-center space-x-2'>
      <div className='text-sm font-medium text-gray-600 dark:text-gray-400 '>
        Ano Letivo: {activeYear || '0000'}
      </div>

      {/* Botão tema escuro */}
      <DarkThemeToggle />
      {children}
    </div>
  )
}
