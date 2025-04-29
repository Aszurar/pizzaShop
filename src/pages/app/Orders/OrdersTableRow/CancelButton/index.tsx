import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/cancel-order'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'

type CancelButtonProps = {
  orderId: string
  cantCancelOrder: boolean
}
export function CancelButton({
  orderId,
  cantCancelOrder,
}: Readonly<CancelButtonProps>) {
  const { mutateAsync: cancelOrderFn, isPending } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success('Pedido cancelado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  async function handleCancelOrder() {
    try {
      await cancelOrderFn({ id: orderId })
    } catch (error) {
      console.error('Ocorreu um erro ao cancelar o pedido', error)
      toast.error(
        'Ocorreu um erro ao cancelar o pedido, tente novamente mais tarde',
        {
          action: {
            label: 'Tentar novamente',
            onClick: () => {
              toast.dismiss()
              cancelOrder({ id: orderId })
            },
          },
        },
      )
    }
  }

  return (
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
  )
}
