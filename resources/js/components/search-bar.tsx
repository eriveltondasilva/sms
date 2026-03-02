import { Form } from '@inertiajs/react'
import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Input } from '@/components/ui/input'

import { Icon } from './icon'

interface SearchBarProps {
  placeholder: string
  search: string
}

export function SearchBar({ search, placeholder }: SearchBarProps) {
  return (
    <Form>
      {({ processing }) => (
        <ButtonGroup>
          <Input defaultValue={search} placeholder={placeholder} />
          <Button
            disabled={processing}
            type='submit'
            variant='outline'
            aria-label='Search'
          >
            <Icon iconNode={SearchIcon} />
          </Button>
        </ButtonGroup>
      )}
    </Form>
  )
}
