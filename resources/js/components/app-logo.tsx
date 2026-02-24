import { usePage } from '@inertiajs/react'

import AppLogoIcon from './app-logo-icon'

export default function AppLogo() {
  const { context } = usePage().props
  const logoName = context.school?.short_name || 'Laravel Starter Kit'

  return (
    <>
      <div className='flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground'>
        <AppLogoIcon className='size-5 fill-current text-white dark:text-black' />
      </div>
      <div className='ml-1 grid flex-1 text-left text-sm' title={logoName}>
        <span className='mb-0.5 truncate leading-tight font-semibold'>
          {logoName}
        </span>
      </div>
    </>
  )
}
