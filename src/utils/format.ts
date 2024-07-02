const currencyFormat = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
  minimumFractionDigits: 2,
})

export { currencyFormat }
