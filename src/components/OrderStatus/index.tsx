import { cva } from 'class-variance-authority'

import { StatusType } from '@/data/orders'
import { ORDER_STATUS } from '@/utils/enums'

const orderStatusVariants = cva('h-2 w-2 rounded-full', {
  variants: {
    status: {
      pending: 'bg-slate-400',
      canceled: 'bg-rose-500',
      delivered: 'bg-emerald-500',
      delivering: 'bg-amber-500',
      processing: 'bg-sky-500',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
})
type OrderStatusProps = {
  status: StatusType
}

const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.pending]: 'Pendente',
  [ORDER_STATUS.canceled]: 'Cancelado',
  [ORDER_STATUS.delivered]: 'Entregue',
  [ORDER_STATUS.delivering]: 'Em entrega',
  [ORDER_STATUS.processing]: 'Em preparo',
}

export function OrderStatus({
  status = ORDER_STATUS.pending,
}: Readonly<OrderStatusProps>) {
  const orderStatusColor = orderStatusVariants({ status })
  const orderStatusLabel = ORDER_STATUS_LABELS[status]
  return (
    <div className="flex items-center gap-2">
      <span className={orderStatusColor} />
      <span className="font-medium text-muted-foreground">
        {orderStatusLabel}
      </span>
    </div>
  )
}
