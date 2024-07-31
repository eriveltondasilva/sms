import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Alert as FlowbiteAlert } from 'flowbite-react'

//
export function Alert({ icon = '', time = 0, children, ...props }) {
  const [isShowed, setIsShowed] = useState(true)

  return (
    <>
      {isShowed && (
        <FlowbiteAlert
          icon={icon || Check}
          onDismiss={() => setIsShowed(false)}
          {...props}
        >
          {children}
        </FlowbiteAlert>
      )}
    </>
  )
}
