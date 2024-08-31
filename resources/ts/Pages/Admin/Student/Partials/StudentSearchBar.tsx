import { Link } from '@inertiajs/react'
import { Button } from 'flowbite-react'
import { Search, Undo2 } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/Components/Input'
import { SearchBar } from '@/Components/SearchBar'

import { useFormHandler } from '@/Hooks/useFormHandler'

export function StudentSearchBar() {
  const {
    search: paramsSearch,
    gender: paramsGender,
    perPage: paramsPerPage,
  } = route().params
  const [search, setSearch] = useState(paramsSearch)

  const { handleSubmit, isLoading } = useFormHandler({
    route: 'admin.students.index',
  })

  const genderSelectValues = [
    { id: '', name: 'M/F' },
    { id: 'M', name: 'Masculino' },
    { id: 'F', name: 'Feminino' },
  ]

  const perPageSelectValues = ['', '20', '50']

  return (
    <SearchBar onSubmit={handleSubmit}>
      <SearchBar.Left>
        <Input.Text
          id='search'
          type='search'
          placeholder='Nome ou ID do aluno...'
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete='off'
          autoFocus
        />

        <Input.Select
          id='gender'
          defaultValue={paramsGender}
          values={genderSelectValues}
        />

        <Input.Select
          id='perPage'
          defaultValue={paramsPerPage}
          values={perPageSelectValues}
        />
      </SearchBar.Left>

      <SearchBar.Right>
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
            href={route('admin.students.index')}
            color='light'
            disabled={isLoading}
          >
            <Undo2 className='size-5' />
          </Button>
        </Button.Group>
      </SearchBar.Right>
    </SearchBar>
  )
}
