import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

import { approveOrder } from '@/api/approve-order'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/lib/react-query'
type ApproveButtonProps = {
  orderId: string
}
export function ApproveButton({ orderId }: Readonly<ApproveButtonProps>) {
  const { mutateAsync: approveOrderFn, isPending } = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => {
      toast.success('Pedido aprovado com sucesso')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  async function handleApproveOrder() {
    try {
      await approveOrderFn({ id: orderId })
    } catch (error) {
      console.error('Ocorreu um erro ao tentar aprovar o pedido', error)
      toast.error(
        'Ocorreu um erro ao tentar aprovar o pedido, tente novamente mais tarde',
        {
          action: {
            label: 'Tentar novamente',
            onClick: () => {
              toast.dismiss()
              approveOrderFn({ id: orderId })
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
      onClick={handleApproveOrder}
      isLoading={isPending}
    >
      <ArrowRight className="mr-2 h-3 w-3" />
      Aprovar
    </Button>
  )
}
