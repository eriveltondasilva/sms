import { SearchX } from 'lucide-react'

// ====================================
export default function NotFound({ icon = false, children }) {
  return (
    <div className='my-6 flex items-center gap-3 text-lg opacity-50'>
      {icon && <SearchX />}
      {children}
    </div>
  )
}
