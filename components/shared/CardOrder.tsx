import React from 'react'
import Ticket from './Ticket'
import { Card } from '@/components/ui/card'
import { IOrder } from '@/lib/mongodb/database/models/order.model'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import Image from 'next/image'
import { ApagarOrdem } from './ApagarOrdem'

type CardOrderProps = {
  order: IOrder;
}

const CardOrder: React.FC<CardOrderProps> = ({ order }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId ? sessionClaims.userId : "";
  
  if (!order) {
    return null;
  }

  return (

    <Card className="relative flex items-center gap-4 p-4 rounded-lg shadow-sm dark:shadow-none">
      <img
        src={order.event.imageUrl}
        width={80}
        height={80}
        alt="Event Image"
        className="rounded-md object-cover h-[80px] w-[80px]"
      />
      <div className="grid gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Ticket className="w-4 h-4" />
          <Link href={`/pedido/${order._id}`}>
          <span className='truncate max-w-16 line-clamp-1'>Ticket #{order._id}</span>
          </Link>
        </div>
        <h3 className="font-semibold">{order.eventTitle}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {order.event.location}
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <ApagarOrdem orderId={order._id} />
      </div>
    </Card>
  );
};

export default CardOrder