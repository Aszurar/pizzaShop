import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function getCurrencyFormatInCents(price?: number | null) {
  if (price === null || price === undefined) {
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

function getCurrencyFormat(price: number | null | undefined) {
  if (price === null || price === undefined) {
    return '-'
  }
  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2,
  })

  return currencyFormat.format(price)
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

function getValueFormattedToLocale(value?: number | null) {
  if (value === null || value === undefined) {
    return '-'
  }

  const currencyFormat = value.toLocaleString('pt-Br')
  return currencyFormat
}

export {
  getCurrencyFormat,
  getCurrencyFormatInCents,
  getDateFormattedRelativeToNow,
  getValueFormattedToLocale,
}
