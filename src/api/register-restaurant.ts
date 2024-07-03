import { api } from '@/lib/axios'

type RegisterRestaurantProps = {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}
export async function registerRestaurant({
  email,
  phone,
  managerName,
  restaurantName,
}: RegisterRestaurantProps) {
  await api.post('/restaurants', { email, phone, managerName, restaurantName })
}
