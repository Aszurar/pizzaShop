import { api } from '@/lib/axios'

type AproveOrderParams = {
  id: string | null
}

export async function approveOrder({ id }: AproveOrderParams) {
  await api.patch(`/orders/${id}/approve`)
}
