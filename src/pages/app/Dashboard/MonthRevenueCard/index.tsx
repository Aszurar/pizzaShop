import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EMPTY_VALUE } from '@/utils/consts'
import { getCurrencyFormatInCents } from '@/utils/format'

import { CARD_INFO_VARIANTS_LABEL, CardInfo } from '../CardInfo'
import { CardSkeleton } from '../CardSkeleton'

export function MonthRevenueCard() {
  const {
    data: monthRevenue,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['month-revenue'],
    queryFn: getMonthRevenue,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return <CardSkeleton />
  }

  const monthRevenueReceiptFormatted = getCurrencyFormatInCents(
    monthRevenue?.receipt,
  )
  const percentageValue = monthRevenue?.diffFromLastMonth ?? EMPTY_VALUE
  const cardInfo = {
    variant: CARD_INFO_VARIANTS_LABEL.neutral,
    value: percentageValue,
  }

  if (percentageValue !== EMPTY_VALUE) {
    cardInfo.value = Math.abs(percentageValue)

    if (percentageValue > 0) {
      cardInfo.variant = CARD_INFO_VARIANTS_LABEL.positive
    } else if (percentageValue < 0) {
      cardInfo.variant = CARD_INFO_VARIANTS_LABEL.negative
    }
  }

  return (
    <Card>
      <CardHeader
        className={`flex-row items-center justify-between space-y-0 pb-2`}
      >
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">
          {monthRevenueReceiptFormatted}
        </span>

        <CardInfo
          isError={isError}
          variant={cardInfo.variant}
          percentageValue={cardInfo.value}
          description="em relação ao mês passado"
        />
      </CardContent>
    </Card>
  )
}
