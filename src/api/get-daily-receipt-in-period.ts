import { api } from '@/lib/axios'

export interface IGetDailyReceiptInPeriodResponse {
  date: string
  receipt: number
}

type GetDailyReceiptInPeriodParams = {
  from?: Date
  to?: Date
}

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodParams) {
  const response = await api.get<IGetDailyReceiptInPeriodResponse[]>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
