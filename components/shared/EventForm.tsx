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
import { useUploadThing } from "@/lib/uploadthing"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/mongodb/database/models/event.model"



const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

type EventFormProps = {
  userId: string
  type: "Create" | "Update",
  event? : IEvent,
  eventId?: string
}

const EventForm = ( {userId , type, event, eventId} : EventFormProps) => {

    const [files, setFiles] = useState<File[]>([]);

    const initialValues = event && type === 'Update' ? {...event, 
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
    } : eventDefaultValues;
    const router = useRouter()

    const { startUpload } = useUploadThing('imageUploader')
   
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof eventFormSchema>) {

        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if(!uploadedImages){
                return;
            } 
            uploadedImageUrl = uploadedImages[0].url
        }
        if(type === 'Create'){
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl, price: '0', isFree: true  },
                    userId,
                    path: '/profile'
                })
                
                if(newEvent){
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if(type === 'Update') {
            if(!eventId) {
              router.back()
              return;
            }
      
            try {
              const updatedEvent = await updateEvent({
                userId,
                event: { ...values, imageUrl: uploadedImageUrl, _id: eventId, price: '0', isFree: true  },
                path: `/events/${eventId}`
              })
      
              if(updatedEvent) {
                form.reset();
                router.push(`/events/${updatedEvent._id}`)
              }
            } catch (error) {
              console.log(error);
            }
          }
        
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
                                <Input placeholder="Localização do evento ou Online" {...field} className="input-field"/>
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
          ): `${type === 'Create' ? 'Criar' : 'Atualizar'} Evento`}</Button>
        </form>
      </Form>
  )
}

export default EventForm