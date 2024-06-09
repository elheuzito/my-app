import Collection from '@/components/shared/Collection'
import CollectionOrder from '@/components/shared/CollectionOrder'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/event.actions'
import { getOrdersByUser } from '@/lib/actions/order.action'
import { IOrder } from '@/lib/mongodb/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'


const MyEvents = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage})

  const orderedEvents = orders?.data.map((order: IOrder) => order) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      <section className="bg-cover bg-center py-3 md:py-5 ">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Minhas inscrições</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">
              Descubra
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-1">
        <CollectionOrder 
          data={orderedEvents}
          emptyStateSubtext="Não há inscrições para exibir"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='h3-bold text-center sm:text-left'>Eventos Organizados</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Criar Evento
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-1">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="Nenhum evento criado até agora"
          emptyStateSubtext="Crie agora seu primeiro evento"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default MyEvents