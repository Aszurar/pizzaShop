import { api } from '@/lib/axios'

type SignInProps = {
  email: string
}
export async function signIn({ email }: SignInProps) {
  await api.post('/authenticate', { email })
}
