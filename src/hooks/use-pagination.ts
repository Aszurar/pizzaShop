import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { PAGE } from '@/utils/enums'

export type SetPaginationType = (page: number) => void
export type SetItemsPerPageType = (
  perPage: number | string,
) => Promise<void> | void

enum PAGINATION_QUERY_LABEL {
  page = 'pagina',
  itemsPerPage = 'items-por-pagina',
}

/**
 * Hook para gerenciar a paginação da aplicação.
 *
 * Este hook gerencia o estado de paginação através de parâmetros de URL,
 * permitindo navegação entre páginas e configuração de itens por página.
 *
 * @returns Um objeto contendo:
 * - pageIndex: O índice da página atual (começando em 0 para APIs)
 * - perPage: Número de itens exibidos por página
 * - setPagination: Função para alterar a página atual
 */
export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Obtém a página atual(UI, 1-based) e a quantidade de itens por página, com valores padrão
  // se não estiverem presentes
  const page = searchParams.get(PAGINATION_QUERY_LABEL.page) ?? PAGE.one
  const itemsPerPage =
    searchParams.get(PAGINATION_QUERY_LABEL.itemsPerPage) ?? PAGE.itemsPerPage

  // pageIndex é usado para paginação na API (começa em 0, enquanto a UI mostra página 1)
  // Importante: Aqui transformamos o parâmetro page (1-based) para pageIndex (0-based)
  // pois é esse valor 0-based que enviamos para a API, que a API espera.
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - PAGE.one)
    .parse(page)

  const perPage = z.coerce.number().parse(itemsPerPage)

  /**
   * Atualiza a página atual nos parâmetros da URL.
   * Nota: Esta função recebe o pageIndex (0-based/API) e converte para page (1-based/UI) na URL
   *
   * @param pageIndex O índice da página (começando em 0)
   */
  function setPagination(pageIndex: number) {
    setSearchParams((prevState) => {
      const page = pageIndex + PAGE.one
      prevState.set(PAGINATION_QUERY_LABEL.page, page.toString())
      return prevState
    })
  }

  // Função para alterar o número de itens por página
  // Comentada pois não temos essa funcionalidade na API do pizaShop,
  // mas mantida aqui para referência
  // function setItemsPerPage(perPage: string | number) {
  //   setSearchParams((prevState) => {
  //     prevState.set(PAGINATION_QUERY_LABEL.itemsPerPage, perPage.toString())
  //     return prevState
  //   })
  // }

  return {
    pageIndex,
    perPage,
    setPagination,
    //  setItemsPerPage
  }
}
