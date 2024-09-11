import { Link } from '@inertiajs/react'
import { type ButtonProps, Button, HR } from 'flowbite-react'

function PageHeaderRoot({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='flex-row items-center justify-between space-y-3 sm:flex sm:space-x-4 sm:space-y-0'>
        {children}
      </header>
      <HR />
    </>
  )
}

function PageHeaderTitle({ text }: { text: string }) {
  return <h2 className='mr-5 text-2xl font-semibold'>{text}</h2>
}

function PageHeaderSubtitle({ text }: { text: string }) {
  return <p className='text-gray-500 dark:text-gray-400'>{text}</p>
}

function PageHeaderButton({
  children,
  ...props
}: { children: React.ReactNode } & ButtonProps) {
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
  Subtitle: PageHeaderSubtitle,
  Button: PageHeaderButton,
})
