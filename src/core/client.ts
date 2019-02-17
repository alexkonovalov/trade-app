import axios from "axios";

import { MessagesResponse, TradesResponse, CoinResponse, TradeStatus, Trade } from "./model";
import { fakeTrades, fakeMessages } from './fakes'

const apiKey = '186acfb0';
const TRADES_ENDPOINT = "https://my.api.mockaroo.com/trades.json";
const getMessagesEndpoint = (tradeId: string) => `https://my.api.mockaroo.com/trades/${tradeId}/messages.json`;
const COIN_PRICE_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"

const client = {
  fetchTrades : () => //axios
    //.get(`${TRADES_ENDPOINT}`, {headers: {'X-API-Key': apiKey}})
    fakeTrades
    .then((response: TradesResponse) => {
      return response.data
    }),
  fetchMessages : (tradeId: string) =>/*  axios
    .get(`${getMessagesEndpoint(tradeId)}`, {headers: {'X-API-Key': apiKey}}) */
    fakeMessages(tradeId)
    .then((response: MessagesResponse) => {
      return response.data
    }),
  getCoinPrice : () => axios
    .get(`${COIN_PRICE_ENDPOINT}`, )
    .then((response: CoinResponse) => {
      return response.data.bpi["USD"]["rate_float"]
    })
};


export default client