import { api } from '@/lib/axios'

type DeliveredOrderParams = {
  id: string | null
}

export async function deliveredOrder({ id }: DeliveredOrderParams) {
  await api.patch(`/orders/${id}/deliver`)
}
