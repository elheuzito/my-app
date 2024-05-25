
import CollectionEvent from '@/components/shared/CollectionEvent';
import { getEventsByUser } from '@/lib/actions/event.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const MyEvents = async () => {
    const { sessionClaims } = auth();

    const userId =  sessionClaims?.userId as string;

    const events = await getEventsByUser({userId: userId, limit: 6, page: 1})

    


    return (
    <>
    <section>
        <CollectionEvent 
        data={events?.data}
        emptyStateSubtext="Nenhum evento encontrado"
        limit={6}
        page={1}
        totalPages={1}
        />
    </section>
    </>
  )
}

export default MyEvents