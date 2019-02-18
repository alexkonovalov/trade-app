const route = {
  tradeList: {
    path: '/:filter',
    getPath: (filter: 'notseen' | 'paid') => `/${filter}`
  },
  trade: {
    path: '/:filter/:tradeId',
    getPath: (filter: 'notseen' | 'paid', tradeId: string) => `/${filter}/${tradeId}`
  }
};

export type TradeRouteParams = {
  tradeId: string,
  filter: 'notseen' | 'paid'
};

export default route;