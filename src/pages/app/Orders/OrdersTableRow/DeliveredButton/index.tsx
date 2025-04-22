import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { deliveredOrder } from '@/api/delivered-order'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'

type DeliveredButtonProps = {
  orderId: string
}
export function DeliveredButton({ orderId }: Readonly<DeliveredButtonProps>) {
  const { mutateAsync: deliveredOrderFn, isPending } = useMutation({
    mutationFn: deliveredOrder,
    onSuccess: () => {
      toast.success('Pedido entregue com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  async function handleDeliveredOrder() {
    try {
      await deliveredOrderFn({ id: orderId })
    } catch (error) {
      console.error(
        'Ocorreu um erro ao tentar mover seu pedido para entregue',
        error,
      )
      toast.error(
        'Ocorreu um erro ao tentar mover seu pedido para entregue, tente novamente mais tarde',
        {
          action: {
            label: 'Tentar novamente',
            onClick: () => {
              toast.dismiss()
              deliveredOrderFn({ id: orderId })
            },
          },
        },
      )
    }
  }

  return (
    <Button
      variant="outline"
      type="button"
      size="xs"
      onClick={handleDeliveredOrder}
      isLoading={isPending}
    >
      <ArrowRight className="mr-2 h-3 w-3" />
      Entregue
    </Button>
  )
}
