import { api } from '@/lib/axios'

type UpdateProfileProps = {
  name: string
  description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileProps) {
  await api.put('/profile', { name, description })
}
