import './styles.scss'

import { twJoin } from 'tailwind-merge'

import ptLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'

import { eventList } from './data'

// ============================================================================
export default function Calendar() {
  return (
    <section
      className={twJoin(
        'rounded-xl bg-gray-50 px-4 py-10',
        'dark:bg-gray-900 sm:px-14'
      )}>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView='dayGridMonth'
        themeSystem='bootstrap5'
        locale={ptLocale}
        headerToolbar={{
          left: 'title',
          right: 'dayGridMonth,dayGridWeek,listMonth',
        }}
        fixedWeekCount='true'
        weekNumbers='true'
        height={600}
        dayMaxEvents={2}
        events={eventList}
        moreLinkClick='list'
      />
    </section>
  )
}

// -----------------------------------
// function renderEventContent(eventInfo) {
//   return (
//     <p className='mb-2 w-40 truncate' title={eventInfo.event.title}>
//       {eventInfo.event.title}
//     </p>
//   )
// }
