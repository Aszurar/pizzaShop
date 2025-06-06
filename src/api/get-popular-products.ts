import { api } from '@/lib/axios'

export interface IGetPopularProductsResponse {
  product: string
  amount: number
}

export async function getPopularProducts() {
  const response = await api.get<IGetPopularProductsResponse[]>(
    '/metrics/popular-products',
  )

  return response.data
}
