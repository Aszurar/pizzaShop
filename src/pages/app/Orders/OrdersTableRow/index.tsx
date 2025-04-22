import { useMutation } from '@tanstack/react-query'
import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/cancel-order'
import { OrderStatus } from '@/components/OrderStatus'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { IOrder } from '@/data/orders'
import { queryClient } from '@/lib/react-query'
import { ORDER_STATUS } from '@/utils/enums'
import {
  getCurrencyFormatInCents,
  getDateFormattedRelativeToNow,
} from '@/utils/format'

import { OrderTableDetails } from '../OrderTableDetails'
import { ApproveButton } from './ApproveButton'
import { DeliveredButton } from './DeliveredButton'
import { DispatchButton } from './DispatchButton'

type OrdersTableRowProps = {
  order: IOrder
}

export function OrdersTableRow({ order }: Readonly<OrdersTableRowProps>) {
  const [isDetailsOrderDialogOpen, setIsDetailsOrderDialogOpen] =
    useState(false)

  const ordersTotalPriceInCents = getCurrencyFormatInCents(order.total)
  const orderDateFormatted = getDateFormattedRelativeToNow(order.createdAt)

  const canCancelOrder =
    order.status === ORDER_STATUS.processing ||
    order.status === ORDER_STATUS.pending
  // Só pode cancelar o pedido caso ele esteja em processamento ou pendente
  const cantCancelOrder = !canCancelOrder

  const isShowApproveButton = order.status === ORDER_STATUS.pending
  const isShowDispatchButton = order.status === ORDER_STATUS.processing
  const isDeliveredButton = order.status === ORDER_STATUS.delivering

  const { mutateAsync: cancelOrderFn, isPending } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success('Pedido cancelado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  async function handleCancelOrder() {
    try {
      await cancelOrderFn({ id: order.orderId })
    } catch (error) {
      console.error('Ocorreu um erro ao cancelar o pedido', error)
      toast.error(
        'Ocorreu um erro ao cancelar o pedido, tente novamente mais tarde',
        {
          action: {
            label: 'Tentar novamente',
            onClick: () => {
              toast.dismiss()
              cancelOrder({ id: order.orderId })
            },
          },
        },
      )
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog
          open={isDetailsOrderDialogOpen}
          onOpenChange={setIsDetailsOrderDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderTableDetails
            orderId={order.orderId}
            isDetailsOrderDialogOpen={isDetailsOrderDialogOpen}
          />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {orderDateFormatted}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">{ordersTotalPriceInCents}</TableCell>

      <TableCell>
        {isShowApproveButton && <ApproveButton orderId={order.orderId} />}
        {isShowDispatchButton && <DispatchButton orderId={order.orderId} />}
        {isDeliveredButton && <DeliveredButton orderId={order.orderId} />}
      </TableCell>

      <TableCell>
        <Button
          size="xs"
          type="button"
          variant="ghost"
          isLoading={isPending}
          disabled={cantCancelOrder}
          onClick={handleCancelOrder}
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
