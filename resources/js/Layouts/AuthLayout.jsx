import { Head, usePage } from '@inertiajs/react'
import { Drawer } from 'flowbite-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { Breadcrumb } from '@/Components/Breadcrumb'
import { Footer } from '@/Components/Footer'
import { Header } from '@/Components/Header'
import { Sidebar } from '@/Components/Sidebar'

import { useSidebarCollapsed } from '@/Hooks/useSidebarCollapsed'

import SidebarItems from './data'

import schoolImg from '../../images/school.png'

//
export default function AuthLayout({
  title = '',
  breadcrumb = [],
  stats = null,
  children,
}) {
  const { user, activeYear } = usePage()?.props?.auth || {}
  const { isCollapsed, handleCollapse } = useSidebarCollapsed()

  const [isOpen, setIsOpen] = useState(false)

  const sidebarItems = SidebarItems[user?.role || 'user']

  const hasBreadcrumb = breadcrumb.length > 0

  return (
    <div className='relative'>
      <Head title={title} />

      {/* # SIDEBAR */}
      <Sidebar
        id='sidebar'
        aria-label='Barra Lateral'
        collapsed={isCollapsed}
        className='hidden md:block'
      >
        <Sidebar.Logo
          img={schoolImg}
          imgAlt='Escola Viver'
        >
          Escola Viver
        </Sidebar.Logo>
        <Sidebar.Menu items={sidebarItems} />
      </Sidebar>

      {/* # MOBILE SIDEBAR */}
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Drawer.Items>
          <Sidebar
            id='sidebar-mobile'
            aria-label='Barra Lateral No Celular'
          >
            <Sidebar.Logo
              img={schoolImg}
              imgAlt='Escola Viver'
            >
              Escola Viver
            </Sidebar.Logo>
            <Sidebar.Menu
              items={sidebarItems}
              onClose={() => setIsOpen(false)}
            />
            <Sidebar.TriggerClose onClick={() => setIsOpen(false)} />
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      <section
        className={twJoin(
          'flex min-h-dvh max-w-full flex-col',
          'space-y-2 px-4 py-2',
          isCollapsed ? 'md:ml-16' : 'md:ml-64'
        )}
      >
        {/* # HEADER */}
        <Header>
          <Header.Left
            username={user?.username}
            onCollapseSidebar={handleCollapse}
            onOpenSidebar={() => setIsOpen(true)}
          />
          <Header.Right activeYear={activeYear}>
            <Header.Dropdown user={user} />
          </Header.Right>
        </Header>

        {/* # BREADCRUMB */}
        {hasBreadcrumb && (
          <Breadcrumb>
            {breadcrumb.map((item, index) => (
              <Breadcrumb.Item
                key={index}
                item={item}
              />
            ))}
          </Breadcrumb>
        )}

        {/* # STATISTIC CARDS */}
        {stats}

        {/* # MAIN */}
        <main
          className={twJoin(
            'flex-1 px-4 py-8 sm:px-8',
            'rounded-lg border-t-4 shadow-md',
            'border-yellow-300',
            'bg-gray-50 text-gray-900',
            'dark:bg-gray-800 dark:text-gray-200'
          )}
        >
          {children}
        </main>

        {/* # FOOTER */}
        <Footer>
          <Footer.Left />
          <Footer.Right />
        </Footer>
      </section>
    </div>
  )
}
