import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { dispatchOrder } from '@/api/dispatch-order'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'
type DispatchButtonProps = {
  orderId: string
}
export function DispatchButton({ orderId }: Readonly<DispatchButtonProps>) {
  const { mutateAsync: dispatchOrderFn, isPending } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess: () => {
      toast.success('Pedido está agora em entrega')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  async function handleDispatchOrder() {
    try {
      await dispatchOrderFn({ id: orderId })
    } catch (error) {
      console.error(
        'Ocorreu um erro ao tentar por seu pedido para entregar',
        error,
      )
      toast.error(
        'Ocorreu um erro ao tentar mover seu pedido para entrega, tente novamente mais tarde',
        {
          action: {
            label: 'Tentar novamente',
            onClick: () => {
              toast.dismiss()
              dispatchOrderFn({ id: orderId })
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
      onClick={handleDispatchOrder}
      isLoading={isPending}
    >
      <ArrowRight className="mr-2 h-3 w-3" />
      Em entrega
    </Button>
  )
}
