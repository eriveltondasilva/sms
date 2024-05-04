export default function formatId(id = 0, options = {}) {
  const { pad = 3, prefix = '0' } = options

  try {
    if (Number.isInteger(id) === false) throw new Error('ID inválido.')

    const idString = '#' + id.toString().padStart(pad, prefix)

    return idString
  } catch (error) {
    console.error('Erro ao formatar ID:', error.message)
  }
}
