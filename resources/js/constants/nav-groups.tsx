import {
    BookOpenIcon,
    CalendarClockIcon,
    CalendarDaysIcon,
    CalendarIcon,
    ClipboardListIcon,
    FileCogIcon,
    FileTextIcon,
    GraduationCapIcon,
    KeyIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    NewspaperIcon,
    NotebookPenIcon,
    RotateCcwIcon,
    SchoolIcon,
    ScrollTextIcon,
    ShieldCheckIcon,
    ShieldIcon,
    UsersIcon,
} from 'lucide-react'

import type { NavGroup } from '@/types'

import { UserPermission } from '@/wayfinder/App/Enums/UserPermission'

export const NAV_GROUPS: NavGroup[] = [
    {
        // * Visão Geral
        label: null,
        items: [
            {
                title: 'Painel',
                href: '#',
                icon: LayoutDashboardIcon,
            },
            {
                title: 'Notícias',
                href: '#',
                icon: NewspaperIcon,
            },
        ],
    },
    {
        // * Foco em Cadastros e Pessoas
        label: 'Acadêmico',
        items: [
            {
                title: 'Alunos',
                href: '#',
                icon: GraduationCapIcon,
                // permission: UserPermission.STUDENTS_VIEW,
            },
            {
                title: 'Professores',
                href: '#',
                icon: UsersIcon,
                // permission: UserPermission.TEACHERS_VIEW,
            },
            {
                title: 'Turmas',
                href: '#',
                icon: LibraryBigIcon,
                // permission: UserPermission.CLASSES_VIEW,
            },
        ],
    },
    {
        // * Foco na Rotina Diária e Avaliações
        label: 'Pedagógico',
        items: [
            {
                title: 'Planos de Aula',
                href: '#',
                icon: NotebookPenIcon,
                // permission: UserPermission.LESSON_PLANS_VIEW,
            },
            {
                title: 'Diário de Classe',
                href: '#',
                icon: ScrollTextIcon,
            },
            {
                title: 'Frequência',
                href: '#',
                icon: ClipboardListIcon,
                // permission: UserPermission.ATTENDANCES_VIEW,
            },
            {
                title: 'Notas e Avaliações',
                href: '#',
                icon: ShieldCheckIcon,
                // permission: UserPermission.GRADES_VIEW,
            },
            {
                title: 'Recuperação',
                href: '#',
                icon: RotateCcwIcon,
                // permission: UserPermission.RECOVERIES_VIEW,
            },
            {
                title: 'Horário',
                href: '#',
                icon: CalendarClockIcon,
                // permission: UserPermission.SCHOOL_CALENDAR_VIEW,
            },
        ],
    },
    {
        // * Foco na Estrutura/Configuração
        label: 'Gestão Escolar',
        items: [
            {
                title: 'Anos Letivos',
                href: '#',
                icon: CalendarIcon,
                // permission: UserPermission.SCHOOL_YEARS_VIEW,
            },
            {
                title: 'Disciplinas',
                href: '#',
                icon: BookOpenIcon,
                // permission: UserPermission.SUBJECTS_VIEW,
            },
            {
                title: 'Tipos de Avaliação',
                href: '#',
                icon: FileCogIcon,
                // permission: UserPermission.ASSESSMENT_TYPES_VIEW,
            },
            {
                title: 'Calendário',
                href: '#',
                icon: CalendarDaysIcon,
            },
        ],
    },
    {
        // * Foco em Análises e Métricas
        label: 'Relatórios',
        items: [
            {
                title: 'Histórico Escolar',
                href: '#',
                icon: FileTextIcon,
            },
            {
                title: 'Boletins',
                href: '#',
                icon: FileTextIcon,
                // permission: UserPermission.REPORTS_STUDENT,
            },
            {
                title: 'Relatórios de Turma',
                href: '#',
                icon: FileTextIcon,
                // permission: UserPermission.REPORTS_CLASS,
            },
        ],
    },
    {
        // * Foco em Configurações e Segurança
        label: 'Administração',
        items: [
            {
                title: 'Escolas',
                href: '#',
                icon: SchoolIcon,
                permission: UserPermission.ADMIN_SCHOOLS_MANAGE,
            },
            {
                title: 'Usuários',
                href: '#',
                icon: UsersIcon,
                permission: UserPermission.ADMIN_USERS_MANAGE,
            },
            {
                title: 'Perfis de Acesso',
                href: '#',
                icon: ShieldIcon,
                permission: UserPermission.ADMIN_ROLES_MANAGE,
            },
            {
                title: 'Permissões',
                href: '#',
                icon: KeyIcon,
                permission: UserPermission.ADMIN_PERMISSIONS_MANAGE,
            },
        ],
    },
]
