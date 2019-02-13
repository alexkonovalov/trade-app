export type ItemCategories = 'dead' | 'alive';

export type Item = { 
  id: string;
  category: ItemCategories;
}

export type Message = {
  content: string;
}

export type TradeMessage = Message & {
  sender: 'buyer' | 'seller';
}

export type Chats = { [tradeId: string] : TradeMessage[] }
export interface State {
  items: Item[];
  viewAs: 'buyer' | 'seller';
  coinPrice: number | undefined,
  chats: Chats;
}

export type ItemResponse = {
  data: Item[];
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