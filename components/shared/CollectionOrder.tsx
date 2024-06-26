import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'
import CardEvents from './CardEvents'
import { IOrder } from '@/lib/mongodb/database/models/order.model'
import CardOrder from './CardOrder'


type OrderEventProps = {
  data: IOrder[],
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
}

const CollectionOrder = ({
  data, 
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: OrderEventProps) => {

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-8">
          <ul className="grid w-full grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-2 sm:grid-cols-1 lg:p-2 border-b  border-grey-200">
            {data.map((order) => {
              if (!order || !order._id) {
                return null;
              }

              return (
                <li
                  key={order._id}
                  className="flex justify-center flex-col gap-2 mb-4 py-4"
                >
                  <CardOrder order={order} />
                </li>
              );
            })}

          </ul>
        </div>
    ): (
        <div className='flex-center wrapper min-h-[180px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
            <h3 className='p-bold-20 md:h5-bold'>Você não possui nenhum evento criado</h3>
            <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
    )}
    </>
  )
}

export default CollectionOrder