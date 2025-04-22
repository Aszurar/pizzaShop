import { api } from '@/lib/axios'

type CancelOrderParams = {
  id: string | null
}

export async function cancelOrder({ id }: CancelOrderParams) {
  await api.patch(`/orders/${id}/cancel`)
}
