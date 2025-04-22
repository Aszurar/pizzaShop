import { api } from '@/lib/axios'

type DispatchOrderParams = {
  id: string | null
}

export async function dispatchOrder({ id }: DispatchOrderParams) {
  await api.patch(`/orders/${id}/dispatch`)
}
