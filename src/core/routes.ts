const route = {
  tradeCategory: {
    path: '/:category',
    getPath: (category: 'paid' | 'unpaid') => `/${category}`
  },
  trade: {
    path: '/:category/:tradeId',
    getPath: (category: 'paid' | 'unpaid', tradeId: string) => `/${category}/${tradeId}`
  }
}

export type ITradeRouteParams = {
  tradeId: string,
  category: 'paid' | 'unpaid'
}

export default route