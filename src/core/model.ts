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
  chats: Chats;
}

export type ItemResponse = {
  data: Item[];
}
