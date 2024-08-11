import { NotFound } from '@/Components/NotFound'
import { XCircle } from 'lucide-react'

export default function SchoolYearNotFound() {
  return (
    <NotFound>
      <XCircle />
      Não existem anos letivos criados...
    </NotFound>
  )
}
