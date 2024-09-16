const mapGender = {
  M: 'Masculino',
  F: 'Feminino',
} as const

export function getGenderName(gender: 'M' | 'F'): string {
  return mapGender[gender] || 'invalid gender'
}
