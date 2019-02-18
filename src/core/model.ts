export type TradeStatus = 'paid' | 'unpaid';

export type BuyerInfo = {
  name: string;
  imgSrc: string;
  rating: {
    positive: number;
    negative: number;
  }
}

export type Trade = { 
  id: string;
  status: TradeStatus;
  price: number;
  paymentMethod: string;
  hasUnreadMessage: boolean;
  isReleased: boolean;
  buyerInfo: BuyerInfo;
}

export type Message = {
  content: string;
  attachedSrc?: string;
}

export type TradeMessage = Message & {
  sender: 'buyer' | 'seller';
}

export type Chats = {
  [tradeId: string] : {
    messages?: TradeMessage[],
    isFetching?: boolean
  }
  | undefined
}

export type TradesState = {
  trades: Trade[];
  chats: Chats;
}

export type AppState = {
  error: string | undefined;
  viewAs: 'buyer' | 'seller';
  coinPrice: number | undefined,
}

export type TradesResponse = {
  data: Trade[];
}

export type MessagesResponse = {
  data: TradeMessage[];
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