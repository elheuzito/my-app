import { IEvent } from '@/lib/mongodb/database/models/event.model'
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation';
import { formatDateTime } from '@/lib/utils';

type CardEventsProps = {
    event: IEvent
}

const CardEvents = ({ event } : CardEventsProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const isEventCreator = userId === event.organizer?._id.toString();
    return (
        <div className="flex items-center gap-5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 height-96 divide-x divide-slate-200 border-s-1 shadow-md transition-all hover:shadow-lg">
          {isEventCreator && (
            <div className='right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
            <Link href={`/events/${event._id}/update`}>
              <Image
                src="/assets/icons/edit.svg"
                width={20}
                height={20}
                alt="edit"
              />
            </Link>
            <DeleteConfirmation eventId={event._id} />
            </div>
          )}
          <div className="flex flex-col gap-2 p-5 md:gap-4">
            <div className="flex gap-2">
              <span className="p-semibold-14 w-min rounded-full bg-green-100 px-3 py-1 text-green-60">
                {event.isFree ? "Gratuito" : `${event.price}`}
              </span>
              <p className="p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                {event.category?.name}
              </p>
            </div>
            <div className='flex-between w-full pl-1'>
            <p className="p-medium-12 text-grey-500">
          {formatDateTime(event.endDateTime).dateOnly}
            </p>
            </div>
            <Link
            href={`/events/${event._id}`}
            className="p-1 flex-center flex-grow  bg-cover bg-center text-grey-500"
            >
            
            <p className="p-medium-16 md:p-medium-16 line-clamp-2 flex-1 text-black">
              {event.title}
            </p>
            </Link>
          </div>
        </div>
      );
    };

export default CardEvents