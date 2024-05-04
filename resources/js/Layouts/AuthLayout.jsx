import { Head, usePage } from '@inertiajs/react'
import { twJoin } from 'tailwind-merge'

import Breadcrumb from '@/Components/Breadcrumb'
import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import Sidebar from '@/Components/Sidebar'
import StatisticCards from '@/Components/StatisticCards'

import schoolImg from '/resources/images/school.png'

import SidebarItems from './data'

// ============================================================================
export default function AuthLayout({
  title = '',
  breadcrumb = [],
  statistics = [],
  children,
}) {
  const { user, activeYear } = usePage().props.auth || {}
  const userRole = user.role.name || 'user'

  const sidebarItemsMap = {
    admin: SidebarItems.Admin,
    teacher: SidebarItems.Teacher,
    student: SidebarItems.Student,
    user: SidebarItems.User,
  }[userRole]

  return (
    <>
      <Head title={title} />

      {/* #sidebar */}
      <Sidebar>
        <Sidebar.Logo img={schoolImg} imgAlt='Escola Viver'>
          Escola Viver
        </Sidebar.Logo>
        <Sidebar.TriggerClose />
        <Sidebar.Menu items={sidebarItemsMap} />
      </Sidebar>

      <Wrapper>
        {/* #header */}
        <Header>
          <Header.Left role={user.role.display_name || 'user'} />
          <Header.Right activeYear={activeYear}>
            <Header.Dropdown avatar_url={user.avatar_url}>
              <Header.DropdownHeader
                role={user.role.display_name || 'user'}
                email={user.email || 'exemplo@email.com'}
              />
              <Header.DropdownItem />
            </Header.Dropdown>
          </Header.Right>
        </Header>

        <section className='space-y-2'>
          {/* #breadcrumb */}
          {breadcrumb.length > 0 && <LayoutBreadcrumb items={breadcrumb} />}

          {/* #statistic cards */}
          {statistics.length > 0 && <LayoutStatisticCards items={statistics} />}
        </section>

        {/* #main */}
        <LayoutMain>{children}</LayoutMain>

        {/* #footer */}
        <Footer>
          <Footer.Left />
          <Footer.Right />
        </Footer>
      </Wrapper>
    </>
  )
}

function LayoutMain({ children }) {
  return (
    <main
      className={twJoin(
        'px-4 py-8 sm:px-8',
        'rounded-lg border-t-4 shadow-md',
        'border-yellow-300',
        'bg-gray-50 text-gray-900',
        'dark:bg-gray-800 dark:text-gray-200'
      )}>
      {children}
    </main>
  )
}

function LayoutBreadcrumb({ items }) {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index} item={item} />
      ))}
    </Breadcrumb>
  )
}

function LayoutStatisticCards({ items }) {
  return (
    <StatisticCards>
      {items.map((item, index) => (
        <StatisticCards.Item key={index}>
          <StatisticCards.Icon icon={item.icon} />
          <StatisticCards.Body title={item.title} value={item.value} />
        </StatisticCards.Item>
      ))}
    </StatisticCards>
  )
}

// -----------------------------------
function Wrapper({ children }) {
  return (
    <div
      className={twJoin(
        'grid grid-rows-[auto_auto_1fr_auto]',
        'min-h-dvh max-w-full',
        'gap-y-3 px-4 py-2 md:ml-64'
      )}>
      {children}
    </div>
  )
}
