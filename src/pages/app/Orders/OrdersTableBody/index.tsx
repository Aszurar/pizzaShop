import { IGetOrdersResponse } from '@/api/get-orders'

import { OrdersTableRow } from '../OrdersTableRow'
import { OrdersTableSkeleton } from '../OrdersTableSkeleton'

type OrdersTableBodyProps = {
  results?: IGetOrdersResponse
  isGettingOrders: boolean
}

export function OrdersTableBody({
  results,
  isGettingOrders,
}: Readonly<OrdersTableBodyProps>) {
  if (isGettingOrders) {
    return <OrdersTableSkeleton />
  }

  if (!results) {
    return null
  }

  return results.orders.map((order) => {
    return <OrdersTableRow key={order.orderId} order={order} />
  })
}
