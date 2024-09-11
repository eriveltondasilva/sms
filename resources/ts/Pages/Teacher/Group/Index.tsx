import { Button } from 'flowbite-react'
import { Search } from 'lucide-react'

import { Input } from '@/Components/Input'
import { NotFound } from '@/Components/NotFound'
import { PageHeader } from '@/Components/PageHeader'
import { SearchBar } from '@/Components/SearchBar'
import { AuthLayout } from '@/Layouts/AuthLayout'

import { useFormHandler } from '@/Hooks/useFormHandler'

import { breadcrumbs, titles } from './data'
import { StudentTable } from './Partials/StudentTable'
import type { GroupIndexProps } from './types'

export default function GroupIndex({
  activeYear,
  teacherGroups,
  selectedGroup,
}: GroupIndexProps) {
  const title = `${titles.index} - ${activeYear.year}`
  const hasGroup = selectedGroup.students.length > 0

  const { handleSubmit: handleSearch, isLoading } = useFormHandler({
    route: 'teacher.groups.index',
  })

  const groupOptions = ['', ...teacherGroups]

  return (
    <AuthLayout
      title={titles.index}
      breadcrumb={breadcrumbs.index}
    >
      <PageHeader>
        <PageHeader.Title text={title} />
      </PageHeader>

      <SearchBar onSubmit={handleSearch}>
        <SearchBar.Left>
          <Input.Select
            id='search'
            defaultValue={selectedGroup.id}
            values={groupOptions}
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

      {!hasGroup && <NotFound>Nenhum turma selecionada...</NotFound>}

      <h3 className='mb-3 text-lg'>
        # Turma selecionada: {selectedGroup.name} (
        {selectedGroup.school_year_id})
      </h3>

      {hasGroup && <StudentTable students={selectedGroup.students} />}
    </AuthLayout>
  )
}
