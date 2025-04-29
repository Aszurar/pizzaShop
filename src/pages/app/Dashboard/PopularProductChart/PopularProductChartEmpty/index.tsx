import { Card, CardContent } from '@/components/ui/card'

export function PopularProductChartEmpty() {
  return (
    <Card className="col-span-3 items-center justify-center">
      <CardContent className="flex h-full items-center justify-center">
        <span className="self-center text-xl">
          Ocorreu um erro ao tentar buscar os dados
        </span>
      </CardContent>
    </Card>
  )
}
