import { Role } from '@/Types'

export function getRoleName(role: Role) {
  return {
    superadmin: 'Super Administrador',
    admin: 'Administrador(a)',
    teacher: 'Professor(a)',
    student: 'Aluno(a)',
    user: 'Usuário',
  }[role || 'user']
}
