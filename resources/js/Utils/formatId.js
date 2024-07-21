export function formatId(id = 0, options = {}) {
  const { pad = 2, prefix = '0' } = options

  return id.toString().padStart(pad, prefix)
}
