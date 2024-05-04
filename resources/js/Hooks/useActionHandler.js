import { router } from '@inertiajs/react'
import { useState } from 'react'

// ===============================================
export default function useActionHandler({
  route: url = '',
  method = '',
  options = {},
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = async (params = {}) => {
    try {
      if (!url) throw new Error('url não informada.')

      if (!method) throw new Error('method não informada.')

      await router.visit(route(url, params), {
        method: method.toLowerCase(),
        onStart: () => setIsLoading(true),
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
