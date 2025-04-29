import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EMPTY_VALUE } from '@/utils/consts'
import { getValueFormattedToLocale } from '@/utils/format'

import { CARD_INFO_VARIANTS_LABEL, CardInfo } from '../CardInfo'
import { CardSkeleton } from '../CardSkeleton'

export function MonthCanceledOrdersAmountCard() {
  const {
    data: monthCanceledOrdersAmount,
    isError,
    isPending,
  } = useQuery({
    queryKey: ['month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return <CardSkeleton />
  }

  const amount =
    getValueFormattedToLocale(monthCanceledOrdersAmount?.amount) ?? EMPTY_VALUE
  const percentageValue =
    monthCanceledOrdersAmount?.diffFromLastMonth ?? EMPTY_VALUE
  const cardInfo = {
    variant: CARD_INFO_VARIANTS_LABEL.neutral,
    value: percentageValue,
  }

  if (percentageValue !== EMPTY_VALUE) {
    cardInfo.value = Math.abs(percentageValue)

    if (percentageValue < 0) {
      cardInfo.variant = CARD_INFO_VARIANTS_LABEL.positive
    } else if (percentageValue > 0) {
      cardInfo.variant = CARD_INFO_VARIANTS_LABEL.negative
    }
  }

  return (
    <Card>
      <CardHeader
        className={`flex-row items-center justify-between space-y-0 pb-2`}
      >
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{amount}</span>

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
