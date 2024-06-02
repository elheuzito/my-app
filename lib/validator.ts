import { z } from "zod";

// Validando os formulários


export const eventFormSchema = z.object({
    title: z.string().min(3, {
      message: "Titulo deve ter pelo menos 3 caracteres.",
    }),
    description: z.string().min(3, {
      message: "Descrição deve ter pelo menos 3 caracteres.",
    }).max(400, "Descrição deve ter no máximo 400 caracteres."),
    location: z.string().min(3, {
      message: "Local deve ter pelo menos 3 caracteres.",
    }).max(400, "Local deve ter no máximo 400 caracteres."),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    //isFree: z.boolean(),
    url: z.string(),
  })

export const userFormSchema = z.object({
    firstName: z.string().min(3, {
      message: "Nome deve ter pelo menos 3 caracteres.",
    }),
    lastName: z.string().min(3,
      {
        message: "Sobrenome deve ter pelo menos 3 caracteres"
      }
    ),
    email: z.string().min(3, {
      message: "Email deve ter pelo menos 3 caracteres",
    })
  })


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
}