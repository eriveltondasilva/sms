import { router, usePage } from '@inertiajs/react'
import { useCallback, useState } from 'react'

import type { Method, VisitOptions } from '@/Types'

type UseFormHandlerProps = {
  route: string
  method?: Method
  params?: Record<string, any>
  options?: VisitOptions
}

export function useFormHandler({
  route: url = '',
  method = 'get',
  params = {},
  options = {},
}: UseFormHandlerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { errors } = usePage().props

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const formArray = [...formData.entries()]
      const filteredArray = formArray.filter(
        ([, value]) => (value as string).trim() !== '',
      )

      const data = Object.fromEntries(filteredArray)

      setIsLoading(true)

      try {
        router.visit(route(url, params), {
          data,
          method,
          onFinish: () => setIsLoading(false),
          ...options,
        })
      } catch (error) {
        console.error('Erro ao enviar formulário:\n', (error as Error).message)
        setIsLoading(false)
      }
    },
    [url, method, params, options],
  )

  return {
    handleSubmit,
    isLoading,
    errors,
  }
}
