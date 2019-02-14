export type TradeStatus = 'paid' | 'unpaid';

export type Trade = { 
  id: string;
  status: TradeStatus;
}

export type Message = {
  content: string;
}

export type TradeMessage = Message & {
  sender: 'buyer' | 'seller';
}

export type Chats = { [tradeId: string] : TradeMessage[] }
export interface State {
  trades: Trade[];
  viewAs: 'buyer' | 'seller';
  coinPrice: number | undefined,
  chats: Chats;
}

export type TradesResponse = {
  data: Trade[];
}

export type CoinResponse = {
  data: {
/*     time: {
      updated: string,
      updatedISO: string,
      updateduk: string
    }
    disclimer: string, */
    bpi: {
      [ currency : string ]: {
        code: string
        rate: string,
        description: string,
        rate_float: number
      }
    }
  }
}