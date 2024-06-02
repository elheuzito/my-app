import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { User } from 'lucide-react';
import UserForm from '@/components/shared/UserForm';

export default async function Perfil() {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const user = await getUserById(userId);

  console.log(user)

  const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <>
    <div className='w-full max-w-xl mx-auto p-6 md:p-8 lg:p-10'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10'>
            <div className='flex-shrink-0'>
                <Avatar className='w-20 h-20 md:w-24 md:h-24'>
                    <AvatarImage src={user.photo} alt="User Image"/>
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex-1 space-y-4'>
                <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                        <h1 className='text-xl font-bold text-gray-700'>{capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)}</h1>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>{user.email}</p>
                    </div>
                    <Sheet>
                        <div className='flex background-color-grey-50'>
                        <SheetTrigger asChild>
                            <Button variant="outline">Atualizar Perfil</Button>
                        </SheetTrigger>
                        <SheetContent className='bg-white p-5 shadow-lg rounded-lg'>
                            <SheetHeader>
                            <SheetTitle>Editar Perfil</SheetTitle>
                            <SheetDescription>
                                Personalize seu perfil de acordo com suas necessidades.
                            </SheetDescription>
                            </SheetHeader>
                
                                <div className="grid gap-4 py-4">
                                    <UserForm user={user} userId={userId} />
                                </div>
                            <SheetFooter>

                            <SheetClose asChild>
                                <Button className='rounded' type="submit">x</Button>
                            </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                        </div>
                        </Sheet>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-1'>
                        <p className='text-sm font-medium'>Primeiro Nome</p>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>{capitalizeFirstLetter(user.firstName)}</p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-sm font-medium'>Último Nome</p>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>{capitalizeFirstLetter(user.lastName)}</p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-sm font-medium'>Data de Nascimento</p>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>-</p>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-sm font-medium'>Estado</p>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>-</p>
                    </div>
                </div>
                <Separator className='my-6' />
                <div className='my-8'>
                    <div>
                        <h2 className='text-xl font-bold my-4 text-gray-700'>
                            Sobre
                        </h2>
                        <p className='text-gray-500 dark:text-gray-400 text:sm'>
                            {user.sobre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

