import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { getOrdersDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/OrderStatus'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'
import {
  getCurrencyFormatInCents,
  getDateFormattedRelativeToNow,
} from '@/utils/format'

import { OrderDetailsSkeleton } from './OrderDetailsSkeleton'

type OrdersTableDetailProps = {
  orderId: string
  isDetailsOrderDialogOpen: boolean
}

export function OrderTableDetails({
  orderId,
  isDetailsOrderDialogOpen,
}: Readonly<OrdersTableDetailProps>) {
  const {
    data: orderDetail,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ['order-details', orderId],
    queryFn: () => getOrdersDetails({ id: orderId }),
    enabled: isDetailsOrderDialogOpen,
  })

  const isShowOrderDetails = !!orderDetail && !isPending

  const orderTotalsPrice = getCurrencyFormatInCents(orderDetail?.totalInCents)
  const orderDate = getDateFormattedRelativeToNow(orderDetail?.createdAt)

  useEffect(() => {
    if (isError) {
      console.error('Ocorreu um erro ao buscar os detalhes do pedidos', error)

      toast.error('Ocorreu um erro ao buscar os detalhes do pedidos', {
        action: {
          label: 'Tentar novamente',
          onClick: () => {
            queryClient.invalidateQueries({
              queryKey: ['order-details', orderId],
            })
          },
        },
      })
    }
  }, [isError, error, orderId])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: {orderId}</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      {isPending && <OrderDetailsSkeleton />}
      {isShowOrderDetails && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={orderDetail.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetail.customer.name}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  {orderDetail.customer.phone ?? '-'}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {orderDetail.customer.email}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">{orderDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            {orderDetail.orderItems.map((item) => {
              const price = getCurrencyFormatInCents(item.priceInCents)
              const subtotal = item.priceInCents * item.quantity
              const subtotalFormatted = getCurrencyFormatInCents(subtotal)
              return (
                <TableBody key={item.id}>
                  <TableRow>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">{price}</TableCell>
                    <TableCell className="text-right">
                      {subtotalFormatted}
                    </TableCell>
                  </TableRow>
                </TableBody>
              )
            })}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {orderTotalsPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
