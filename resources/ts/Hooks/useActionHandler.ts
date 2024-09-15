import { router } from '@inertiajs/react'
import { useCallback, useState } from 'react'

import type { Method, VisitOptions } from '@/Types'

type UseActionHandlerProps = {
  route: string
  method?: Method
  options?: VisitOptions
}

export function useActionHandler({
  route: url = '',
  method = 'get',
  options = {},
}: UseActionHandlerProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = useCallback(
    (params: Record<string, any> = {}) => {
      setIsLoading(true)

      try {
        router.visit(route(url, params), {
          method,
          onFinish: () => setIsLoading(false),
          ...options,
        })
      } catch (error) {
        console.error('Erro ao executar ação:', (error as Error).message)
      }
    },
    [url, method, options],
  )

  return {
    isLoading,
    handleAction,
  }
}
