import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

// APROVEITANDO A PAGINA DE CRIAR PARA PEGAR OS ELEMENTOS SE NECESSARIO ATUALIZAR

const UpdateEvent = () => {
    // Usando um webhook para pegar o userId do usuario que está logado

    const { sessionClaims } = auth();

    const userId =  sessionClaims?.userId as string;
  return (
    <>
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="font-bold text-zinc-800 wrapper text-center text-xl sm:text-left"> Criar Evento </h3>
    </section>
    <div className='wrapper my-8'>
        <EventForm userId={userId} type="Update"/>
    </div>
    </>
  )
}

export default UpdateEvent