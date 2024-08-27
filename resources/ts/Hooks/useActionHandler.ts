import { router } from '@inertiajs/react'
import { useState, useCallback } from 'react'

import type { Method, VisitOptions } from '@/Types'

export type UseActionHandlerProps = {
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
      try {
        setIsLoading(true)

        router.visit(route(url, params), {
          method,
          onFinish: () => setIsLoading(false),
          ...options,
        })
      } catch (error: any) {
        console.error('Erro ao executar ação:', error.message)
      }
    },
    [url, method, options],
  )

  return {
    isLoading,
    handleAction,
  }
}
