import EventForm from '@/components/shared/EventForm'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

export default async function CreateEvent(): Promise<JSX.Element> {
  // Usando um webhook para pegar o userId do usuario que está logado

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);

  

  if(user.access === true) {
    return (
      <>
        <section className="bg-cover bg-center py-5 md:py-5">
          <h3 className="font-bold text-zinc-800 wrapper text-center text-xl">
            {" "}
            Criar Evento{" "}
          </h3>
        </section>
        <div className="wrapper my-3">
          <EventForm userId={userId} type="Create" />
        </div>
      </>
    );
  }
  return (
    <>
      {console.log(user.access)}
      <section className="bg-cover bg-center py-5 md:py-5">
        <h3 className="font-bold text-zinc-800 wrapper text-center text-xl">
        {" "}
        Você não tem permissão para criar eventos{" "}
        </h3>
      </section>
    </>
  );
}

