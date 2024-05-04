export default function formatDate(dateString = '', dateStyle = 'short') {
  try {
    const date = new Date(dateString)

    if (isNaN(date)) throw new Error('Data inválida')

    const locale = 'pt-BR'
    const options = { dateStyle: dateStyle, timeZone: 'UTC' }

    return date.toLocaleDateString(locale, options)
  } catch (error) {
    console.error('Erro ao formatar data:', error.message)
  }
}
