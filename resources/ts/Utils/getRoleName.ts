import type { Role } from '@/Types'

const roleMap = {
  superadmin: 'Super Administrador',
  admin: 'Administrador(a)',
  teacher: 'Professor(a)',
  student: 'Aluno(a)',
  user: 'Usuário',
} as const

export function getRoleName(role: Role): string {
  return roleMap[role] || 'invalid role'
}
