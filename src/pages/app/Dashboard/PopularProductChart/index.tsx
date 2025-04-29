import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrencyFormatInCents } from '@/utils/format'

import { PieLabel } from './PieLabel'
import { PopularProductChartEmpty } from './PopularProductChartEmpty'

const PIE_COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductChart() {
  const {
    data: popularProducts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['popular-products'],
    queryFn: getPopularProducts,
  })

  if (isPending) {
    return <Skeleton className="h-[370px] w-[448px] rounded-lg" />
  }

  if (!popularProducts || isError) {
    return <PopularProductChartEmpty />
  }

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart data={popularProducts} style={{ fontSize: 12 }}>
            <Tooltip
              contentStyle={{
                background: colors.zinc[950],
                color: colors.zinc[100],
                fontWeight: 'bolder',
                borderColor: colors.zinc[600],
                borderRadius: 8,
              }}
              itemStyle={{ color: colors.zinc[200] }}
              // formatter={(value) => getCurrencyFormatInCents(Number(value))}
            />
            <Pie
              data={popularProducts}
              cy="50%"
              cx="50%"
              dataKey="amount"
              nameKey="product"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => (
                <PieLabel
                  cx={cx}
                  cy={cy}
                  data={popularProducts}
                  value={value}
                  index={index}
                  midAngle={midAngle}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                />
              )}
            >
              {popularProducts.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
