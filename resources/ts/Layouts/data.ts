import { type SidebarItem } from '@/Components/Sidebar'
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

const SuperAdminSidebarItems: SidebarItem[][] = []

const AdminSidebarItems: SidebarItem[][] = [
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
    {
      title: 'Anos Letivos',
      icon: Calendar,
      route: 'admin.school-years.index',
    },
  ],
]

const TeacherSidebarItems: SidebarItem[][] = [
  [
    { title: 'Painel', icon: Home, route: 'teacher.dashboard' },
    { title: 'Calendário', icon: CalendarDays, route: 'teacher.calendar' },
  ],
  [
    { title: 'Turmas', icon: UsersRound, route: 'teacher.groups.index' },
    { title: 'Notas', icon: Album, route: 'teacher.grades.index' },
  ],
]

const StudentSidebarItems: SidebarItem[][] = [
  [
    { title: 'Painel', icon: Home, route: 'student.dashboard' },
    { title: 'Calendário', icon: CalendarDays, route: 'student.calendar' },
  ],
]

const UserSidebarItems: SidebarItem[][] = [[]]

export default {
  superadmin: SuperAdminSidebarItems,
  admin: AdminSidebarItems,
  teacher: TeacherSidebarItems,
  student: StudentSidebarItems,
  user: UserSidebarItems,
}
