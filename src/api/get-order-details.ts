import { IOrderDetails } from '@/data/orders'
import { api } from '@/lib/axios'

type GetOrdersParams = {
  id: string | null
}

export async function getOrdersDetails({ id }: GetOrdersParams) {
  const orders = await api.get<IOrderDetails>(`/orders/${id}`)

  return orders.data
}
