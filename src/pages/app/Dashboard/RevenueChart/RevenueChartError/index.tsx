import { Card, CardContent } from '@/components/ui/card'

export function RevenueChartError() {
  return (
    <Card className="col-span-6">
      <CardContent className="flex h-full items-center justify-center">
        <span className="self-center text-xl">
          Ocorreu um erro ao tentar buscar os dados
        </span>
      </CardContent>
    </Card>
  )
}
