import type { Method, VisitOptions } from '@/Types'
import { router, usePage } from '@inertiajs/react'
import { useCallback, useState } from 'react'

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

      try {
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        setIsLoading(true)

        router.visit(route(url, params), {
          data,
          method,
          onFinish: () => setIsLoading(false),
          ...options,
        })
      } catch (error: any) {
        console.error('Erro ao enviar formulário:\n', error.message)
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
