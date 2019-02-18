import axios from "axios";

import { MessagesResponse, TradesResponse, TradeMessage, CoinResponse, TradeStatus, Trade } from "./model";

const getMessagesEndpoint = (tradeId: string) => `https://my.api.mockaroo.com/trades/${tradeId}/messages.json`;
const COIN_PRICE_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
const apiKey = '186acfb0';

const sampleTrade = {
  id: 'trade1',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: true,
  paymentMethod: 'PayPal 1',
  hasUnreadMessage: false,
  buyerInfo: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}
const sampleTrade2 = {
  id: 'trade2',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 2',
  hasUnreadMessage: false,
  buyerInfo: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

const sampleTrade3 = {
  id: 'trade3',
  status: 'paid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 3',
  hasUnreadMessage: false,
  buyerInfo: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

const sampleTrade4 = {
  id: 'trade4',
  status: 'unpaid' as TradeStatus,
  price: 300,
  isReleased: false,
  paymentMethod: 'PayPal 4',
  hasUnreadMessage: true,
  buyerInfo: {
    name: 'Harshampur Maharaji',
    rating: { positive: 33, negative: -50 },
    imgSrc: 'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'
  }
}

const chats :{[key: string]: TradeMessage[]} = {
trade1: [
  {sender: 'buyer', content: 'tere yo', key: 'asdf1'},
  {sender: 'seller', content: 'tere 1', key: 'asdf2'},
  {sender: 'seller', content: 'tere 2', key: 'asdf3'},
  {sender: 'buyer', content: 'tere yo yo', key: 'asdf4'},
] ,
trade3: [
  {sender: 'buyer', content: 'tere yo', key: 'asdf5'},
  {sender: 'seller', content: 'tere 1', key: 'asd6f'},
  {sender: 'seller', content: 'tere 2', key: 'asdf7'},
  {sender: 'buyer', content: 'tere yo yo', key: 'as8df'},
],
trade4: [
  {sender: 'buyer', content: 'tere yo', key: 'asd9f'},
  {sender: 'seller', content: 'tere 1', key: 'asd66f'},
  {sender: 'seller', content: 'tere 2', key: 'as00df'},
  {sender: 'buyer', content: 'tere yo yo', key: 'as22df'},
],
trade2: [
  {sender: 'buyer', content: 'tere yosss', key: 'asnndf'},
  {sender: 'buyer', content: 'tere 1sss', key: 'asdddf'},
  {sender: 'seller', content: 'tere 2ss', key: 'asaadf'},
  {sender: 'buyer', content: 'tere yo yoss', key: 'aszzzf'},
]
}

export const fakeTrades = new Promise<TradesResponse>(function(resolve, reject) {
    setTimeout(function() {
      resolve({ data: [sampleTrade, sampleTrade2, sampleTrade3, sampleTrade4] });
    }, 300);
  });

export const fakeMessages = (tradeId : string) => new Promise<MessagesResponse>(function(resolve, reject) {
  setTimeout(function() {
    resolve({ data: chats[tradeId] });
  }, 300);
});