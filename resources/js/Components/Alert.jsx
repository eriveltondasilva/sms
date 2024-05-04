import { Alert as FlowbiteAlert } from 'flowbite-react'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

// ====================================
export default function Alert({ icon = '', time = 0, children, ...props }) {
  const [isShowed, setIsShowed] = useState(true)

  const handleDismiss = () => setIsShowed(false)

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(
        () => {
          handleDismiss()
        },
        time * 1000 * 60
      )
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {isShowed && (
        <FlowbiteAlert
          icon={icon || Check}
          onDismiss={handleDismiss}
          {...props}>
          {children}
        </FlowbiteAlert>
      )}
    </>
  )
}
