import { router } from '@inertiajs/react'
import { useState } from 'react'

//
export function useActionHandler({
  route: url = '',
  method = '',
  options = {},
}) {
  const [isLoading, setIsLoading] = useState(false)

  const validateInputs = () => {
    if (!url) throw new Error('URL não informada.')
  }

  const handleAction = (params = {}) => {
    try {
      validateInputs()

      router.visit(route(url, params), {
        method: method.toLowerCase() || 'get',
        onBefore: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
        ...options,
      })
    } catch (error) {
      console.error('Erro ao executar ação:', error.message)
    }
  }

  return {
    isLoading,
    handleAction,
  }
}
