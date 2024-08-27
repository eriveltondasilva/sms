export function getGenderName(gender: string): string {
  const mapGender: Record<string, string> = {
    M: 'Masculino',
    F: 'Feminino',
  }

  return mapGender[gender] || 'Inválido'
}
