type StatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface IOrder {
  orderId: string
  createdAt: Date
  status: StatusType
  customerName: string
  total: number
}

type OrderItems = {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}
interface IOrderDetails {
  id: string
  createdAt: Date
  status: StatusType
  totalInCents: number
  orderItems: OrderItems[]
  customer: {
    name: string
    phone: string | null
    email: string
  }
}

export type { IOrder, IOrderDetails, StatusType }
