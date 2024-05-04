import NotFound from '@/Components/NotFound'
import { XCircle } from 'lucide-react'

export default function GroupNotFound() {
  return (
    <NotFound>
      <XCircle />
      Não existem turmas criadas para o ano letivo atual.
    </NotFound>
  )
}
