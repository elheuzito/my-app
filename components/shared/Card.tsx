import { IEvent } from '@/lib/mongodb/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'path'
import React, { useEffect, useState } from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { connectToDatabase } from '@/lib/mongodb/database'
import { get } from 'http'


type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer?._id.toString();

  

  

  

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />


      {isEventCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
        <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
            {event.isFree ? 'Gratuito' : 'Gratuito'}
          </span>
          <p className="p-semibold-14 rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {event.category?.name}
          </p>
        </div>
        <p className="p-medium-16 text-grey-500">
          {formatDateTime(event.endDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium text-grey-600">
            {event.organizer?.firstName} {event.organizer?.lastName}
          </p>

          {isEventCreator &&(
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
            <p className="text-primary-500">+ Detalhes</p>
            <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card