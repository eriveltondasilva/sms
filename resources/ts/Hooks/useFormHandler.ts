import type { Method, VisitOptions } from '@/Types'
import { router, usePage } from '@inertiajs/react'
import { useCallback, useState } from 'react'

type Params = Record<string, any>

type UseFormHandlerProps = {
  route: string
  method?: Method
  params?: Params
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
      const data = Object.fromEntries(
        Array.from(formData.entries()).filter(
          ([, value]) => typeof value === 'string' && value.trim() !== '',
        ),
      )

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
