import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  // SetItemsPerPageType,
  SetPaginationType,
} from '@/hooks/use-pagination'
import { PAGE } from '@/utils/enums'

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select'

interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onChangePage: SetPaginationType
  // onChangeItemsPerPage: SetItemsPerPageType
}

// const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100]

/**
 * Componente de paginação que exibe navegação entre páginas e informações sobre o total de itens.
 *
 * @param pageIndex Índice da página atual (0-based)
 * @param totalCount Número total de itens disponíveis
 * @param perPage Número de itens por página
 * @param onChangePage Função para mudar a página atual
 */
export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onChangePage,
  // onChangeItemsPerPage,
}: Readonly<PaginationProps>) {
  const totalPages = Math.ceil(totalCount / perPage) || PAGE.one
  // const perPageConverted = perPage.toString()

  const firstPage = PAGE.zero // Para a api, a paginação começa em 0

  // Para a API, o total de páginas é o total - 1 pela API começar a
  // contar a partir do 0
  const lastPage = totalPages - PAGE.one

  const previousPage = pageIndex - PAGE.one
  const nextPage = pageIndex + PAGE.one
  // Converte de 0-based(pageIndex) para 1-based(page/UI) para exibição
  const currentPageLabel = nextPage

  // Verifica se pode navegar para diferentes páginas
  const cantGoToFirstPage = previousPage < firstPage
  const cantGoToPreviousPage = cantGoToFirstPage
  const cantGoToNextPage = nextPage > lastPage
  const cantGoToLastPage = cantGoToNextPage

  return (
    <div className="flex items-center justify-between px-2">
      <span className="flex-1 text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        {/*  Seletor de itens por página
          <div className="flex items-center space-x-2">
            <p className=" text-sm font-medium sm:flex">Items por página</p>
            <Select value={perPageConverted} onValueChange={onChangeItemsPerPage}>
              <SelectTrigger
                className="h-8 w-[70px]"
                aria-label="Selecione a quantidade de itens por página"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {ITEMS_PER_PAGE_OPTIONS.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        */}

        <div className="text-sm font-medium">
          Página {currentPageLabel} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={cantGoToFirstPage}
            onClick={() => onChangePage(firstPage)}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={cantGoToPreviousPage}
            onClick={() => onChangePage(previousPage)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={cantGoToNextPage}
            onClick={() => onChangePage(nextPage)}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={cantGoToLastPage}
            onClick={() => onChangePage(lastPage)}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
