type Options = {
  pad?: number
  prefix?: string
}

export function formatId(id = 0, options: Options = {}) {
  const { pad = 2, prefix = '0' } = options

  return id.toString().padStart(pad, prefix)
}
