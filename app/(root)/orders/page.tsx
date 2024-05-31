import Search from '@/components/shared/Search'
import { getOrdersByEvent } from '@/lib/actions/order.action'
import { SearchParamProps } from '@/types'
import { IOrderItem } from '@/lib/mongodb/database/models/order.model'
import { formatDateTime } from '@/lib/utils'

const Orders = async ({ searchParams }: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || ''
  const searchText = (searchParams?.query as string) || ''

  const orders = await getOrdersByEvent({ eventId, searchString: searchText })

  return (
    <>
      <section className=" bg-center py-2 md:py-5">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Inscrições</h3>
      </section>

      <section className="wrapper mt-2">
        <Search placeholder="Procurar inscritos..." />
      </section>

      <section className="wrapper overflow-x-auto">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Evento Titulo</th>
              <th className="min-w-[150px] py-3 text-left">Inscrito</th>
              <th className="min-w-[100px] py-3 text-left">Criado</th>
              <th className="min-w-[100px] py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  Nenhum inscrito nesse evento.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[250px] py-4 text-primary-500">{row._id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">{row.eventTitle}</td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Orders