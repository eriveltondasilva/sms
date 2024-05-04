export default function getGenderName(gender) {
  try {
    if (gender !== 'M' && gender !== 'F') throw new Error('Gênero inválido')

    return gender === 'M' ? 'Masculino' : 'Feminino'
  } catch (error) {
    console.error('Erro ao obter nome do gênero:', error.message)
  }
}
