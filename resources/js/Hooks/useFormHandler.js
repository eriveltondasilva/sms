import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'

// ===============================================
export default function useFormHandler({
  route: url = '',
  method = '',
  params = {},
  options = {},
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { errors } = usePage().props || {}

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!url) throw new Error('url não informada.')

      if (!method) throw new Error('method não informada.')

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData.entries())

      await router.visit(route(url, params), {
        data,
        method: method.toLowerCase(),
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
        ...options,
      })
    } catch (error) {
      console.error('Erro ao enviar formulário:', error.message)
    }
  }

  return {
    handleSubmit,
    isLoading,
    errors,
  }
}
