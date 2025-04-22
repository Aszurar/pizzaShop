import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ORDER_STATUS } from '@/utils/enums'

const orderFilterSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().optional(),
  status: z
    .enum([
      ORDER_STATUS.all,
      ORDER_STATUS.pending,
      ORDER_STATUS.canceled,
      ORDER_STATUS.processing,
      ORDER_STATUS.delivering,
      ORDER_STATUS.delivered,
    ])
    .optional(),
})

type OrderFilterType = z.infer<typeof orderFilterSchema>

type OrdersFiltersProps = {
  isPending?: boolean
}

export function OrdersTableFilters({
  isPending,
}: Readonly<OrdersFiltersProps>) {
  const [searchParams, setSearchParams] = useSearchParams()

  const id = searchParams.get('id')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const isFiltered = !!id || !!customerName || !!status

  const {
    reset,
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<OrderFilterType>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      id: id ?? '',
      customerName: customerName ?? '',
      status: (status as OrderFilterType['status']) ?? ORDER_STATUS.all,
    },
  })

  const isFilterLoading = isPending || isSubmitting

  function handleResetFilters() {
    setSearchParams((prevState) => {
      prevState.delete('id')
      prevState.delete('customerName')
      prevState.delete('status')
      prevState.set('page', '1')

      return prevState
    })

    reset({
      id: '',
      customerName: '',
      status: ORDER_STATUS.all,
    })
  }

  function handleFilter(data: OrderFilterType) {
    setSearchParams((prevState) => {
      if (data.id) {
        prevState.set('id', data.id)
      } else {
        prevState.delete('id')
      }

      if (data.customerName) {
        prevState.set('customerName', data.customerName)
      } else {
        prevState.delete('customerName')
      }

      if (data.status) {
        prevState.set('status', data.status)
      } else {
        prevState.delete('status')
      }

      prevState.set('page', '1')

      return prevState
    })
  }

  return (
    <form
      id="order-filters"
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <div className="space-y-2">
        <Input
          id="id"
          placeholder="ID do pedido"
          isInvalid={!!errors.id}
          className="h-8 w-auto"
          {...register('id')}
        />
        {!!errors.id && (
          <span className="text-xs text-destructive">{errors.id.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Input
          id="customerName"
          placeholder="Nome do cliente"
          isInvalid={!!errors.customerName}
          className="h-8 w-80"
          {...register('customerName')}
        />
        {!!errors.customerName && (
          <span className="text-xs text-destructive">
            {errors.customerName.message}
          </span>
        )}
      </div>

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <div className="space-y-2">
            <Select
              defaultValue="all"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                isInvalid={!!errors.status}
                className="h-8 w-[180px]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em preparo</SelectItem>
                <SelectItem value="delivering">Em entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>

            {!!errors.status && (
              <span className="text-xs text-destructive">
                {errors.status.message}
              </span>
            )}
          </div>
        )}
      />

      <Button
        form="order-filters"
        variant="secondary"
        size="xs"
        type="submit"
        isLoading={isFilterLoading}
      >
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      {isFiltered && (
        <Button
          variant="outline"
          size="xs"
          type="button"
          onClick={handleResetFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Remover filtros
        </Button>
      )}
    </form>
  )
}
