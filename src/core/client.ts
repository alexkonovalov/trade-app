import axios from 'axios';

import { MessagesResponse, TradesResponse, CoinResponse } from './model';

const apiKey = '186acfb0';
const TRADES_ENDPOINT = 'https://my.api.mockaroo.com/trades.json';
const getMessagesEndpoint = (tradeId: string) => `https://my.api.mockaroo.com/trades/${tradeId}/messages.json`;
const COIN_PRICE_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json'

const client = {
  fetchTrades: async () => {
    const response : TradesResponse = await axios.get(`${TRADES_ENDPOINT}`, {headers: {'X-API-Key': apiKey}})
    return response.data
  },
  fetchMessages: async (tradeId: string) => { 
    const response: MessagesResponse = await axios
    .get(`${getMessagesEndpoint(tradeId)}`, {headers: {'X-API-Key': apiKey}})
    return response.data
  },
  getCoinPrice: async () => {
    const response: CoinResponse = await axios.get(COIN_PRICE_ENDPOINT)
    return response.data.bpi['USD']['rate_float']
  }
};


export default client