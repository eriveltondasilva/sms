import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'

//
export default function useFormHandler({
  route: url = '',
  method = '',
  params = {},
  options = {},
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { errors } = usePage().props || {}

  const validateInputs = () => {
    if (!url) throw new Error('URL não informada.')
    if (!method) throw new Error('Método não informado.')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      validateInputs()

      const formData = new FormData(e.target)
      const data = Object.fromEntries(formData.entries())

      router.visit(route(url, params), {
        data,
        method: method.toLowerCase() || 'get',
        onBefore: () => setIsLoading(true),
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
