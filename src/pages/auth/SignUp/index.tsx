import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/router/routes'

const SignUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpFormProps = z.infer<typeof SignUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(SignUpForm),
  })

  const { mutateAsync: registerRestaurantFn, isPending } = useMutation({
    mutationFn: registerRestaurant,
  })

  const isLoading = isPending || isSubmitting

  async function handleSignUp(data: SignUpFormProps) {
    try {
      registerRestaurantFn({
        email: data.email,
        phone: data.phone,
        managerName: data.managerName,
        restaurantName: data.restaurantName,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`${ROUTES.SIGN_IN}?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button className=" absolute right-8 top-8">
          <Link to={ROUTES.SIGN_IN}>Fazer login</Link>
        </Button>
        <div className="flex w-80 flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
              <ErrorMessage>{errors?.restaurantName?.message}</ErrorMessage>
            </div>
            <div className="space-y-2">
              <Label>Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
              <ErrorMessage>{errors?.managerName?.message}</ErrorMessage>
            </div>
            <div className="space-y-2">
              <Label>Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </div>
            <div className="space-y-2">
              <Label>Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-4">
                politicas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
