import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/router/routes'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInFormProps = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const emailAfterRegister = searchParams.get('email') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormProps>({
    defaultValues: {
      email: emailAfterRegister,
    },
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  })

  const isLoading = isSubmitting || isPending

  async function handleSignIn(data: SignInFormProps) {
    try {
      authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch (error) {
      toast.error('Erro ao enviar o link de autenticação')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button className=" absolute right-8 top-8">
          <Link to={ROUTES.SIGN_UP}>Novo estabelecimento</Link>
        </Button>
        <div className="flex w-80 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label>Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
