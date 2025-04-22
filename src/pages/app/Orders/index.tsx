import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/Pagination'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { usePagination } from '@/hooks/use-pagination'
import { queryClient } from '@/lib/react-query'

import { OrdersTableBody } from './OrdersTableBody'
import { OrdersTableFilters } from './OrdersTableFilters'
import { OrdersTableHeader } from './OrdersTableHeader'

export function Orders() {
  const [searchParams] = useSearchParams()
  const { pageIndex, perPage, setPagination } = usePagination()

  const id = searchParams.get('id')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const {
    data: results,
    isPending: isGettingOrders,
    error,
    isError,
  } = useQuery({
    queryKey: ['orders', pageIndex, id, customerName, status],
    queryFn: () => getOrders({ pageIndex, id, customerName, status }),
  })

  useEffect(() => {
    if (isError) {
      console.error('Ocorreu um erro ao buscar os pedidos', error)

      toast.error('Ocorreu um erro ao buscar os pedidos', {
        action: {
          label: 'Tentar novamente',
          onClick: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
          },
        },
      })
    }
  }, [isError, error])

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-1 flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrdersTableFilters isPending={isGettingOrders} />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <OrdersTableHeader />
              </TableHeader>

              <TableBody>
                <OrdersTableBody
                  results={results}
                  isGettingOrders={isGettingOrders}
                />
              </TableBody>
            </Table>
          </div>
          {results && (
            <Pagination
              pageIndex={results.meta.pageIndex}
              perPage={perPage}
              totalCount={results.meta.totalCount}
              onChangePage={setPagination}
            />
          )}
        </div>
      </div>
    </>
  )
}
