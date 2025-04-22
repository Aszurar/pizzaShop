enum PAGE {
  zero = 0,
  one = 1,
  itemsPerPage = 10,
}

enum ORDER_STATUS {
  all = 'all',
  pending = 'pending',
  canceled = 'canceled',
  processing = 'processing',
  delivering = 'delivering',
  delivered = 'delivered',
}

export { ORDER_STATUS, PAGE }
