import { Trade, TradeStatus, TradeMessage, Chats } from '../core/model'

export const mockTrade: Trade = {
  id: 'trade1',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 1',
  hasUnreadMessage: false,
  buyerInfo: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://img.com/tere.jpg'
  }
}

export const mockChat : TradeMessage[] = [
  {sender: 'buyer', content: 'tere'}
]
