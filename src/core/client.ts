import axios from "axios";

import { TradesResponse, CoinResponse } from "./model";

const TRADES_ENDPOINT = "https://my.api.mockaroo.com/items.json";
const COIN_PRICE_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
const apiKey = '186acfb0';

const client = {
  fetchTrades : () => axios
    .get(`${TRADES_ENDPOINT}`, {headers: {'X-API-Key': apiKey}})
    .then((response: TradesResponse) => {
      return response.data
    }),
  getCoinPrice : () => axios
    .get(`${COIN_PRICE_ENDPOINT}`, )
    .then((response: CoinResponse) => {
      return response.data.bpi["USD"]["rate_float"]
    })
};


export default client