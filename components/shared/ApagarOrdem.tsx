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

import { deleteOrderById } from '@/lib/actions/order.action'

interface DeleteConfirmationProps {
    orderId: string;
  }
  
  export const ApagarOrdem = ({ orderId }: DeleteConfirmationProps) => {
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
              Essa ordem será apagada permanentemente
            </AlertDialogDescription>
          </AlertDialogHeader>
  
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
  
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  const result = await deleteOrderById(orderId)
                  if (result.success) {
                    console.log('Order deleted successfully')
                  } else {
                    console.error('Failed to delete order:', result)
                  }
                })
              }>
              {isPending ? 'Apagando...' : 'Apagar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }