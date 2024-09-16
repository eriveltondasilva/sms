import { Head, usePage } from '@inertiajs/react'
import { Drawer } from 'flowbite-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

import { Breadcrumb, Footer, Header, Sidebar, StatCard } from '@/Components'
import { useSidebarCollapsed } from '@/Hooks/useSidebarCollapsed'
import type { PageProps } from '@/Types'

import schoolImg from '../../images/school.png'
import SidebarItems from './data'
import type { AuthLayoutProps } from './types'

export function AuthLayout({
  title = '',
  breadcrumb = [],
  stats = [],
  children,
}: AuthLayoutProps) {
  const { user, activeYear } = usePage<PageProps>().props.auth
  const { isCollapsed, handleCollapse } = useSidebarCollapsed()

  const [isOpen, setIsOpen] = useState(false)

  const sidebarItems = SidebarItems[user.role || 'user']

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
          href=''
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
              href=''
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
          'space-y-2 px-2 py-2 sm:px-4',
          isCollapsed ? 'md:ml-16' : 'md:ml-64',
        )}
      >
        {/* # HEADER */}
        <Header>
          <Header.Left
            username={user.username}
            onCollapseSidebar={handleCollapse}
            onOpenSidebar={() => setIsOpen(true)}
          />
          <Header.Right activeYear={activeYear.year}>
            <Header.Dropdown user={user} />
          </Header.Right>
        </Header>

        {/* # BREADCRUMB */}
        {breadcrumb.length > 0 && (
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
        {stats.length > 0 && (
          <ul className='grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4'>
            {stats.map((stat) => (
              <StatCard key={stat.title}>
                <StatCard.Icon icon={stat.icon} />
                <StatCard.Content>
                  <StatCard.Title title={stat.title} />
                  <StatCard.Value value={stat.value} />
                </StatCard.Content>
              </StatCard>
            ))}
          </ul>
        )}

        <main
          className={twJoin(
            'flex-1 px-4 py-8 sm:px-8',
            'rounded-lg border-t-4 shadow-md',
            'border-yellow-300',
            'bg-gray-50 text-gray-900',
            'dark:bg-gray-800 dark:text-gray-200',
          )}
        >
          {children}
        </main>

        <Footer>
          <Footer.Left />
          <Footer.Right />
        </Footer>
      </section>
    </div>
  )
}
