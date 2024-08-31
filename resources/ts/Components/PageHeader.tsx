import { Link } from '@inertiajs/react'
import { type ButtonProps, Button, HR } from 'flowbite-react'

function PageHeaderRoot({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className='flex-row items-center justify-between space-y-3 sm:flex sm:space-x-4 sm:space-y-0'>
        {children}
      </header>
      <HR />
    </>
  )
}

function PageHeaderTitle({ title = '', subtitle = '' }) {
  return (
    <div>
      <h2 className='mr-5 text-2xl font-semibold'>{title}</h2>
      {subtitle && <PageHeaderSubtitle subtitle={subtitle} />}
    </div>
  )
}

function PageHeaderSubtitle({ subtitle = '' }) {
  return <p className='text-gray-500 dark:text-gray-400'>{subtitle}</p>
}

function PageHeaderButton({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <div className='flex'>
      <Button
        as={Link}
        color='blue'
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}

export const PageHeader = Object.assign(PageHeaderRoot, {
  Title: PageHeaderTitle,
  Button: PageHeaderButton,
})
