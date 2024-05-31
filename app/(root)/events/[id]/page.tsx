import React from 'react'
import { SearchParamProps } from '@/types'
import { getEventById } from '@/lib/actions/event.actions'
import Image
 from 'next/image'
import { formatDateTime } from '@/lib/utils'
import CheckoutButton from '@/components/shared/CheckoutButton'
import { auth } from '@clerk/nextjs/server'
const EventDetails  = async ({ params: { id }}: SearchParamProps) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    // GET EVENT
    const event = await getEventById(id);

    if (!event) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Evento não encontrado.</p>
            </div>
        );
    }

    //console.log(event);
    
    return (
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl p-1'>
                    <Image 
                    src={event.imageUrl} 
                    alt="hero image"
                    width={1000}
                    height={1000}
                    className='h-full min-h-[300px] object-cover object-center rounded'
                    />
                <div className='flex w-full flex-col gap-8 md:p-10 px-2 pt-2'>
                    <div className='flex flex-col gap-6'>
                        <h2 className='h2-medium'>{event.title}</h2>
                        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                            <div className='flex gap-3'>
                                <p className='p-medium-16 rounded-full bg-green-500/10 px-5 py-2 text-green-700 '>{event.isFree ? 'Gratuito' : 'Gratuito'}</p>
                                <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                                    {event.category?.name}
                                </p>
                            </div>
                            <div className='flex gap-3'>
                                <p className='p-medium-14 ml-2 mt-2 sm:mt-0'>
                                    Por: {' '}
                                    <span className='text-primary-500'>{event.organizer.firstName} {event.organizer.lastName}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                
                {event.organizer._id === userId ? ' ' : <CheckoutButton event={event} />}

                <div className='flex flex-col gap-5'>
                    <div className='flex gap-2 md:gap-3'>
                        <Image src="/assets/icons/calendar.svg" alt='calendar' width={32} height={32} />
                        <div className='p-medium-14 lg:p-regular-18 flex flex-wrap items-center'>
                            <p>
                                {formatDateTime(event.startDateTime).dateOnly} - {' '}
                                {formatDateTime(event.startDateTime).timeOnly}
                            </p>
                            <p>
                                {formatDateTime(event.endDateTime).dateOnly} - {' '}
                                {formatDateTime(event.endDateTime).timeOnly}
                            </p>
                        </div>
                    </div>
                    <div className='p-regular-20 flex items-center gap-3'>
                        <Image src='/assets/icons/location.svg' alt='location' width={32} height={32} />
                        <p className='p-medium-16 lg:p-regular-20'>{event.location}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='p-bold-20 text-grey-700'> Sobre o Evento  </p>
                    <p className='p-medium-16 lg:p-regular-18'>{event.description}</p>
                    <p className='p-medium-16 lg:p-regular-18 truncate text-primary-500 underline'>{event.url}</p>
                </div>   
                </div>
            </div>
        </section>
    )
}

export default EventDetails