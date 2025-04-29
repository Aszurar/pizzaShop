import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyReceiptInPeriod } from '@/api/get-daily-receipt-in-period'
import { DateRangerPicker } from '@/components/DateRangerPick'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrencyFormat } from '@/utils/format'

import { RevenueChartError } from './RevenueChartError'

const ONE_WEEK = 7

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), ONE_WEEK),
    to: new Date(),
  })
  const {
    data: dailyReceiptInPeriod,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['daily-receipt-in-period', dateRange],
    queryFn: () =>
      getDailyReceiptInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartValues = useMemo(() => {
    const values = dailyReceiptInPeriod?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }))

    return values
  }, [dailyReceiptInPeriod])

  if (isPending) {
    return <Skeleton className="col-span-6 rounded-lg" />
  }

  if (isError || !chartValues) {
    return <RevenueChartError />
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangerPicker date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartValues} style={{ fontSize: 12 }}>
            <YAxis
              width={80}
              stroke="#888"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => getCurrencyFormat(value)}
            />

            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Tooltip
              contentStyle={{
                background: colors.rose[950],
                color: colors.rose[100],
                fontWeight: 'bolder',
                borderColor: colors.rose[600],
                borderRadius: 8,
              }}
              itemStyle={{ color: colors.rose[200] }}
              formatter={(value) => getCurrencyFormat(Number(value))}
            />
            <Line
              type="linear"
              strokeWidth={2}
              stroke={colors.rose[400]}
              dataKey="receipt"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
