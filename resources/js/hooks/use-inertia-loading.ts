import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export function useInertiaLoading(): boolean {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const offStart = router.on('start', () => setLoading(true))
    const offFinish = router.on('finish', () => setLoading(false))

    return () => {
      offStart()
      offFinish()
    }
  }, [])

  return loading
}
