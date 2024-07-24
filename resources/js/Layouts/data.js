import {
  Album,
  Backpack,
  Briefcase,
  Calendar,
  CalendarDays,
  Home,
  LibraryBig,
  UsersRound,
} from 'lucide-react'

// prettier-ignore
const AdminSidebarItems = [
  [
    { title: 'Painel', icon: Home, route: 'admin.dashboard' },
    { title: 'Calendário', icon: CalendarDays, route: 'admin.calendar' },
  ],
  [
    { title: 'Alunos', icon: Backpack, route: 'admin.students.index' },
    { title: 'Professor', icon: Briefcase, route: 'admin.teachers.index' },
  ],
  [
    { title: 'Turmas', icon: UsersRound, route: 'admin.groups.index' },
    { title: 'Disciplinas', icon: LibraryBig, route: 'admin.subjects.index' },
    { title: 'Anos Letivos', icon: Calendar, route: 'admin.academic-years.index' },
  ],
]

// prettier-ignore
const TeacherSidebarItems = [
  [
    { title: 'Painel', icon: Home, route: 'teacher.dashboard' },
    { title: 'Calendário', icon: CalendarDays, route: 'teacher.calendar' },
  ],
  [
    { title: 'Turmas', icon: UsersRound, route: 'teacher.groups.index' },
    { title: 'Notas', icon: Album, route: 'teacher.grades.index' },
  ]
]

// prettier-ignore
const StudentSidebarItems = [
  [
    { title: 'Painel', icon: Home, route: 'student.dashboard' },
    { title: 'Calendário', icon: CalendarDays, route: 'student.calendar' },
  ]
]

// prettier-ignore
const UserSidebarItems = [
  [
    //
  ]
]

//
export default {
  admin: AdminSidebarItems,
  teacher: TeacherSidebarItems,
  student: StudentSidebarItems,
  user: UserSidebarItems,
}
