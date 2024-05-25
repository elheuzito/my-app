import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions';
import { UpdateEventParams } from '@/types';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

// APROVEITANDO A PAGINA DE CRIAR PARA PEGAR OS ELEMENTOS SE NECESSARIO ATUALIZAR
type UpdateEventProps = {
    params: {
        id: string
    }
}

const UpdateEvent = async ({params: {id}}:UpdateEventProps) => {
    // Recebendo o id pelos parametros, fazendo um get do evento pelo id,
    // e passando o id para o formulario
    const { sessionClaims } = auth();

    const userId =  sessionClaims?.userId as string;
    
    const event = await getEventById(id)
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="font-bold text-zinc-800 wrapper text-center text-xl sm:text-left"> Atualizar Evento </h3>
    </section>
    <div className='wrapper my-8'>
        <EventForm type="Update" event={event} eventId={event._id} userId={userId}/>
    </div>
    </>
  )
}

export default UpdateEvent