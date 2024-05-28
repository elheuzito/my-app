import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'
import { createOrder } from '@/lib/actions/order.action'

const Checkout = ({event, userId}: {event: IEvent, userId: string}) => {
    const onCheckout = async () =>
        {
            const order = {
                eventTitle: event.title,
                eventId: event._id,
                buyerId: userId,
                createdAt: new Date()
            }
            await createOrder(order);
        }
  return (
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size='lg' className='button sm:w-fit'>
            {event.isFree? 'Participar' : 'Comprar Inscrição'}
        </Button>
    </form>
  )
}

export default Checkout