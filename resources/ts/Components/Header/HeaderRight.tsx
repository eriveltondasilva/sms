import { Badge, DarkThemeToggle } from 'flowbite-react'

export function HeaderRight({
  activeYear,
  children,
}: React.PropsWithChildren<{ activeYear: number }>) {
  return (
    <div className='flex items-center space-x-2'>
      <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
        Ano Letivo:
      </span>
      <Badge
        color='failure'
        size='sm'
      >
        {activeYear}
      </Badge>

      {/* Botão tema escuro */}
      <DarkThemeToggle />
      {children}
    </div>
  )
}
