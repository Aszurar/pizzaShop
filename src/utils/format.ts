import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function getCurrencyFormatInCents(price?: number | null) {
  if (!price) {
    return '-'
  }

  const priceInCents = price / 100

  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2,
  })

  return currencyFormat.format(priceInCents)
}

function getDateFormattedRelativeToNow(date?: Date | string | null) {
  if (!date) {
    return '-'
  }
  const dateFormatted = new Date(date)

  const dateFormattedRelativeToNow = formatDistanceToNow(dateFormatted, {
    locale: ptBR,
    addSuffix: true,
  })

  return dateFormattedRelativeToNow
}

export { getCurrencyFormatInCents, getDateFormattedRelativeToNow }
