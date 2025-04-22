import { IMeta } from '@/data/meta'
import { IOrder } from '@/data/orders'
import { api } from '@/lib/axios'
import { ORDER_STATUS } from '@/utils/enums'

export interface IGetOrdersResponse {
  orders: IOrder[]
  meta: IMeta
}

type GetOrdersParams = {
  pageIndex: number
  id: string | null
  customerName: string | null
  status: string | null
}

export async function getOrders({
  pageIndex,
  customerName,
  id,
  status,
}: GetOrdersParams) {
  const statusFormatted = status === ORDER_STATUS.all ? null : status

  const orders = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      orderId: id,
      status: statusFormatted,
      customerName,
      pageIndex,
    },
  })

  return orders.data
}
