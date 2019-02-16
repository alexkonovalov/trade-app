const route = {
  tradeList: {
    path: '/:filter',
    getPath: (filter: 'notseen' | 'paid') => `/${filter}`
  },
  trade: {
    path: '/:filter/:tradeId',
    getPath: (filter: 'notseen' | 'paid', tradeId: string) => `/${filter}/${tradeId}`
  }
}

export type ITradeRouteParams = {
  tradeId: string,
  filter: 'notseen' | 'paid'
}

export default route