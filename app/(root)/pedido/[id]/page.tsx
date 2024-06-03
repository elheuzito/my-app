import { Button } from '@/components/ui/button';
import { getEventById } from '@/lib/actions/event.actions';
import { getOrderById } from '@/lib/actions/order.action';
import { formatDateTime } from '@/lib/utils';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeftIcon } from 'lucide-react';
import { relative } from 'path';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getUserById } from '@/lib/actions/user.actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import mongoose from 'mongoose';

const Pedido  = async ({ params: { id }}: SearchParamProps) => {



    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Pedido não encontrado.</p>
            </div>
        );
    }

    const order = await getOrderById(id);
    
    if(!order) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Pedido não encontrado.</p>
            </div>
        );
    }
    const event = await getEventById(order.data.event)

    const user = await getUserById(order.data.buyer)


    return (
        <>
        <div className='wrapper'>
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 dark:bg-gray-800 px-2 md:px-6 py-4 flex items-center justify-between border-b rounded">
                <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="pl-2 sr-only">Voltar</span>
                </Button>
                <div className='flex flex-col gap-1'>
                <h1 className="flex-col font-semibold text-lg md:text-xl">Inscrição # {order.data._id}</h1>
                <p className='flex-col font-regular text-lg md:text-sm text-grey-500'> Registrado no dia {formatDateTime(order.data.createdAt).dateTime}</p>
                </div>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 grid gap-6 md:gap-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Detalhes da Usuario </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row h-24 gap-4">
                        <div className='flex-shrink gap-6'>
                        <Avatar className='w-16 h-16 md:w-16 md:h-16'>
                            <AvatarImage src={user.photo} alt="User Image"/>
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        </div>
                        <div className='flex-col gap-6'>
                            <div className='flex gap-2'>
                            <span className="font-medium">Nome :</span> {user.firstName} {user.lastName}
                            </div>
                            <div className='flex gap-2 pt-2'>
                            <span className="font-medium">Email : </span> {user.email}
                            </div>
                        </div>
                </div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Detalhes da Inscrição </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div>
                        <span className="font-medium">Nome:</span> {user.firstName} {user.lastName}
                        </div>
                        <div>
                        <span className="font-medium">Registrado em:</span> {formatDateTime(order.data.createdAt).dateOnly}
                        </div>
                        <div>
                        <span className="font-medium">Pagamento:</span> Gratuito
                        </div>
                    </div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Detalhes do Evento </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div>
                        <span className="font-medium">Titulo:</span> {event.title}
                        </div>
                        <div>
                        <span className="font-medium">Localidade:</span> {event.location}
                        </div>
                        <div>
                        <span className="font-medium">Data Inicio:</span> {formatDateTime(event.startDateTime).dateOnly}
                        </div>
                        <div>
                        <span className="font-medium">Categoria:</span> {(event.category) ? `${event.category.name}` : 'Não informado'}
                        </div>
                        <div>
                        <span className="font-medium">Organizador:</span> {event.organizer.firstName} {event.organizer.lastName}
                        </div>
                    </div>
                </CardContent>
            </Card>
                <Card>
                <CardHeader>
                <CardTitle>Certificados</CardTitle>
                 </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className='font-medium'>Status</div>
                            <div className='text-green-500'>Aprovado</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className='font-medium'>Responsavel</div>
                            <div className='text-blue-500'>{event.organizer.firstName} {event.organizer.lastName}</div>
                        </div>
                        <div className='flex h-full'>
                        <Separator className='my-16' />
            
                        </div>
                        <div className='-mb-2 flex place-items-end'>
                            <button className='self-end bg-blue-500 text-white py-2 px-4 rounded mt-auto'>Gerar Certificado</button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </div>
            </main>
        </div>
    </div>

        </>
    )

}

export default Pedido