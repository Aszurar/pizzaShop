/**
 * Interface que define os metadados de paginação retornados pela API.
 *
 * @property pageIndex O índice da página atual (começando em 0)
 * @property perPage Número de itens por página
 * @property totalCount Total de itens disponíveis
 */
interface IMeta {
  pageIndex: number
  perPage: number
  totalCount: number
}

export type { IMeta }
