import NotFound from '@/Components/NotFound'
import { XCircle } from 'lucide-react'

export default function SubjectNotFound() {
  return (
    <NotFound>
      <XCircle />
      Não existem disciplinas criadas para o ano letivo atual.
    </NotFound>
  )
}
