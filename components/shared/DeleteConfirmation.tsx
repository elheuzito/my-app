'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { deleteOrdersAndEvent, deleteOrdersByEvent } from '@/lib/actions/order.action'

interface DeleteConfirmationProps {
  eventId: string;
}

export const DeleteConfirmation = ({ eventId }: DeleteConfirmationProps) => {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que quer deletar?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Esse evento será apagado permanentemente
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                const result = await deleteOrdersAndEvent(eventId, pathname)
                if (result.success) {
                  console.log('Event and its orders deleted successfully')
                } else {
                  console.error('Failed to delete event and its orders:', result)
                }
              })
            }>
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}