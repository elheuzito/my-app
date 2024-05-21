"use client"

// Esse elemento sera renderizado na pagina do user
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { FileUploader } from "./FileUploader"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
}

const EventForm = ( {userId , type} : EventFormProps) => {

    const [files, setFiles] = useState<File[]>([]);

    const initialValues = eventDefaultValues;
   
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof eventFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Input placeholder="Nome do evento" {...field} className="input-field"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <Dropdown onChangeHandler={field.onChange} value={field.value} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <div className="flex flex-col gap-5">
                <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <Textarea placeholder="Descrição" {...field} className="textarea rounded-2xl"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <FileUploader onFieldChange={field.onChange} 
                                imageUrl={field.value}
                                setFiles={setFiles}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image src="/assets/icons/location-grey.svg" alt="location" width={24} height={24} />
                                <Input placeholder="Locação do evento ou Online" {...field} className="input-field"/>
                            </div>  
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>

                <div className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} className="filter-grey" />
                                <p className="ml-3 whitespace-nowrap text-gray-600">Data inicial : </p>
                                <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                                showTimeSelect
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/YYYY h:mm aa"
                                wrapperClassName="datePicker"
                                />
                            </div>  
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image src="/assets/icons/calendar.svg" alt="calendar" width={24} height={24} className="filter-grey" />
                                <p className="ml-3 whitespace-nowrap text-gray-600">Data Final : </p>
                                <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} 
                                showTimeSelect
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/YYYY h:mm aa"
                                wrapperClassName="datePicker"
                                />
                            </div>  
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <div className="flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image src="/assets/icons/link.svg" alt="link" width={24} height={24} />
                                <Input placeholder="URL" {...field} className="input-field"/>
                            </div>  
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
          <Button size="lg"type="submit"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
          >{form.formState.isSubmitting ? (
            'Enviando...'
          ): `Criar Evento`}</Button>
        </form>
      </Form>
  )
}

export default EventForm