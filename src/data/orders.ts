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

export type { IOrder, StatusType }
