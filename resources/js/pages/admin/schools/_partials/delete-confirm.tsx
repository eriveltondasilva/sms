import { router } from '@inertiajs/react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { destroy as schoolDestroy } from '@/wayfinder/routes/admin/schools'

import type { School } from '../index'

export function DeleteConfirm() {
  const [deletingSchool, setDeletingSchool] = useState<School | null>(null)

  const handleDeleteConfirm = () => {
    if (!deletingSchool) return
    router.delete(schoolDestroy(deletingSchool.id), {
      onFinish: () => setDeletingSchool(null),
    })
  }

  return (
    <AlertDialog
      open={!!deletingSchool}
      onOpenChange={(open) => !open && setDeletingSchool(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir escola?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir{' '}
            <strong>{deletingSchool?.full_name}</strong>? Esta ação é
            irreversível. Escolas com alunos cadastrados não podem ser
            excluídas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            onClick={handleDeleteConfirm}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
