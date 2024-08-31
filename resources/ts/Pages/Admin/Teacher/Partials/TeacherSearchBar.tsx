import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { SearchBar } from '@/Components/SearchBar'

import { useFormHandler } from '@/Hooks/useFormHandler'

export function TeacherSearchBar() {
  const { search: paramsSearch } = route().params
  const [search, setSearch] = useState(paramsSearch || '')

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.teachers.index',
  })

  return (
    <SearchBar onSubmit={handleSubmit}>
      <SearchBar.Left>
        <Input.Text
          id='search'
          type='search'
          placeholder='Nome ou ID do professor...'
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete='off'
          autoFocus
        />
        <Button.Group>
          <Button
            type='submit'
            color='blue'
            disabled={isLoading}
          >
            <Search className='mr-1 size-5' />
            Pesquisar
          </Button>
          <Button
            as={Link}
            href={route('admin.teachers.index')}
            color='light'
            disabled={isLoading}
          >
            <Undo2 className='size-5' />
          </Button>
        </Button.Group>
      </SearchBar.Left>
    </SearchBar>
  )
}
