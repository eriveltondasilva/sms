import { SearchIcon, XIcon } from 'lucide-react'

import { Icon } from './icon'
import { Button } from './ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'

import type { SubmitEvent } from 'react'

interface TableSearchProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  onClear: () => void
  placeholder?: string
}

export function TableSearch({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Buscar...',
}: TableSearchProps) {
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <InputGroup>
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon className='size-4 text-muted-foreground' />
        </InputGroupAddon>
      </InputGroup>

      {value && (
        <Button type='button' variant='ghost' size='icon' onClick={onClear}>
          <Icon iconNode={XIcon} />
        </Button>
      )}
    </form>
  )
}
