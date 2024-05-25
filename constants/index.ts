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