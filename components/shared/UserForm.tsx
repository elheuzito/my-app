"use client"

import { updateUser } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/mongodb/database/models/user.model'
import { userFormSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
    firstName: z.string().min(1, { message: "Primeiro nome é obrigatório" }),
    lastName: z.string().min(1, { message: "Sobrenome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    sobre: z.string().min(10, {message: "Deve ter pelo menos 10 caracteres"})
});

type UserFormProps = {
    userId: string
    user: IUser
}

const UserForm = ({ userId, user }: UserFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: user,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const updatedUser = await updateUser(userId, values);
            if (updatedUser) {
                form.reset();
                router.push('/perfil');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Primeiro Nome" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Sobrenome" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Email" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sobre"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Fale um pouco sobre você" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    size="lg"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? 'Enviando...' : 'Atualizar'}
                </Button>
            </form>
        </Form>
    )
}

export default UserForm
