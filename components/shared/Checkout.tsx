"use client"

import { useState } from 'react';
import { Button } from '../ui/button';
import { createOrder } from '@/lib/actions/order.action';
import { IEvent } from '@/lib/mongodb/database/models/event.model';
import { useRouter } from 'next/navigation';

const Checkout = ({ event, userId }: { event: IEvent, userId: string }) => {
    const [sending, setSending] = useState(false);
    const router = useRouter();

    const onCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            buyerId: userId,
            createdAt: new Date(),
            present: true
        };

        await createOrder(order);
        setSending(false);
        router.push('/myevents');
        
        
    }

    return (
        <form onSubmit={onCheckout}>
            <Button type='submit' role='link' size='lg' className='button sm:w-fit' disabled={sending}>
                {sending ? 'Enviando...' : (event.isFree ? 'Participar' : 'Comprar Inscrição')}
            </Button>
        </form>
    );
}

export default Checkout;