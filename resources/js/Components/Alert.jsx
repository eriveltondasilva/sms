import { Link } from '@inertiajs/react'
import { useState } from 'react'

import { Alert as FlowbiteAlert } from 'flowbite-react'

//
function AlertRoot({ onDismiss, children, ...props }) {
  const [isShowed, setIsShowed] = useState(true)

  return (
    <>
      {isShowed && (
        <FlowbiteAlert
          onDismiss={onDismiss && (() => setIsShowed(false))}
          {...props}
        >
          {children}
        </FlowbiteAlert>
      )}
    </>
  )
}

function AlertLink({ children, ...props }) {
  return (
    <Link
      className='font-semibold underline hover:text-blue-600'
      {...props}
    >
      {children}
    </Link>
  )
}

export const Alert = Object.assign(AlertRoot, {
  Link: AlertLink,
})
