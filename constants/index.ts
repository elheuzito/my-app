import { routeModule } from "next/dist/build/templates/app-page"

export const headerLinks = [
    {
        label: 'Home',
        route: '/',
    },
    {
        label: 'Criar evento',
        route: 'events/create',
    },
    {
        label: 'Meus eventos',
        route: '/myevents',
    },
    {
        label: 'Perfil',
        route: '/perfil',
    }
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
}