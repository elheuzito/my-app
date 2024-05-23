import { IEvent } from '@/lib/mongodb/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import { format } from 'path'
import React from 'react'


type CardProps = {
  event: IEvent,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({event, hasOrderLink, hidePrice}: CardProps) => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
    <Link 
      href={`/events/${event._id}`}
      style={{backgroundImage: `url(${event.imageUrl})`}}
      className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
    />
     <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-3">
        <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                {event.isFree ? 'Gratuito' : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
                {event.category?.name}
            </p>
            </div>
            <p className='p-medium-16 p-medium-18 text-grey-500'>
                 {formatDateTime(event.endDateTime).dateTime}
            </p>
            <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>{event.title}</p>
            <div className='flex-between w-full'>
                <p className='p-medium-14 md:p-medium text-grey-600'>
                    {event.organizer?.firstName} {event.organizer?.lastName}
                </p>
            </div>
        </div>
    </div>

  )
}

export default Card