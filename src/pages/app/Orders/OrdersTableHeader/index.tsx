import { TableHead, TableRow } from '@/components/ui/table'

export function OrdersTableHeader() {
  return (
    <TableRow>
      <TableHead className="w-16"></TableHead>
      <TableHead className="w-35">Identificador</TableHead>
      <TableHead className="w-45">Realizado há</TableHead>
      <TableHead className="w-35">Status</TableHead>
      <TableHead>Cliente</TableHead>
      <TableHead className="w-35">Total do pedido</TableHead>
      <TableHead className="w-41"></TableHead>
      <TableHead className="w-33"></TableHead>
    </TableRow>
  )
}
