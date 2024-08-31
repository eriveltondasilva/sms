import { Button } from 'flowbite-react'
import { Search } from 'lucide-react'

import { Input } from '@/Components/Input'
import { SearchBar } from '@/Components/SearchBar'
import { useFormHandler } from '@/Hooks/useFormHandler'
import type { Group } from '@/Types'

export function GroupStudentSearchBar({ group }: { group: Group }) {
  const searchId = route().params.search

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.groups.students.create',
    params: { group },
  })

  return (
    <SearchBar onSubmit={handleSubmit}>
      <SearchBar.Left>
        {/*  */}
        <Input.Text
          id='search'
          type='search'
          defaultValue={searchId}
          placeholder='Pesquisar aluno...'
          autoFocus
        />

        <Button
          type='submit'
          color='blue'
          disabled={isLoading}
        >
          <Search className='size-5' />
        </Button>
      </SearchBar.Left>
    </SearchBar>
  )
}
