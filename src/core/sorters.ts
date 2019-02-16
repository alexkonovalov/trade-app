import { Trade } from './model'

export const compareTradesByStatus = (a: Trade, b: Trade) => {
  switch (b.status) {
    case (a.status): return 0;
    case ('paid'): return 1;
    default: return -1;
  }
}

export const compareTradesByNewMessage = (a: Trade, b: Trade) => {
  switch (b.hasUnreadMessage) {
    case (a.hasUnreadMessage): return 0;
    case (true): return 1;
    default: return -1;
  }
}