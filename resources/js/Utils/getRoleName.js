export function getRoleName(role) {
  const roles = {
    admin: 'Administrador',
    teacher: 'Professor',
    student: 'Aluno',
    user: 'Usuário',
  }
  return roles[role || 'user']
}
