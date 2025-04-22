import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  IGetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'

const storeProfileSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchemaProps = z.infer<typeof storeProfileSchema>

type StoreProfileDialogProps = {
  onCloseDialog: () => void
}

export function StoreProfileDialog({
  onCloseDialog,
}: Readonly<StoreProfileDialogProps>) {
  const { data: managedRestaurant, isPending: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['/managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchemaProps>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateProfileRestaurantCache(profileData: StoreProfileSchemaProps) {
    const { name, description } = profileData

    // Get the cached data
    const managedRestaurantCachedData =
      queryClient.getQueryData<IGetManagedRestaurantResponse>([
        '/managed-restaurant',
      ])

    // Update the cached data with the new values
    if (managedRestaurantCachedData) {
      queryClient.setQueryData<IGetManagedRestaurantResponse>(
        ['/managed-restaurant'],
        {
          ...managedRestaurantCachedData,
          name,
          description,
        },
      )
    }

    // Return the updated cached data for
    // update data if the mutation fails
    return { managedRestaurantCachedData }
  }

  const { mutateAsync: updateProfileFn, isPending } = useMutation({
    mutationFn: updateProfile,
    onMutate: (variables) => {
      const { managedRestaurantCachedData } =
        updateProfileRestaurantCache(variables)

      // Return the cached data for
      // restore data if the mutation fails
      return { managedRestaurantCachedData }
    },
    onError: (_, __, context) => {
      // Restore the cached data if the mutation fails
      if (context?.managedRestaurantCachedData) {
        updateProfileRestaurantCache(context.managedRestaurantCachedData)
      }
    },
  })

  const isUpdateProfileLoading = isSubmitting || isPending

  async function handleUpdateProfile(data: StoreProfileSchemaProps) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Perfil atualizado com sucesso')
      onCloseDialog()
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form
        id="storeProfileForm"
        className="space-y-4 py-4"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name">Nome</Label>

          {isLoadingManagedRestaurant ? (
            <Skeleton className="col-span-3 h-8" />
          ) : (
            <Input
              placeholder="Nome do estabelecimento"
              className="col-span-3"
              id="name"
              {...register('name')}
            />
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description">Descrição</Label>

          {isLoadingManagedRestaurant ? (
            <Skeleton className="col-span-3 h-16" />
          ) : (
            <Textarea
              placeholder="Descrição do estabelecimento"
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          )}
        </div>
      </form>
      <DialogFooter>
        <DialogClose>
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          variant="success"
          form="storeProfileForm"
          isLoading={isUpdateProfileLoading}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
