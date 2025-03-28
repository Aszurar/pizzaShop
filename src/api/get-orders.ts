import { IMeta } from '@/data/meta'
import { IOrder } from '@/data/orders'
import { api } from '@/lib/axios'

export interface IGetOrdersResponse {
  orders: IOrder[]
  meta: IMeta
}

type GetOrdersParams = {
  pageIndex: number
}

export async function getOrders({ pageIndex }: GetOrdersParams) {
  const orders = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return orders.data
}
