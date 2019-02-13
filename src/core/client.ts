import axios from "axios";

import { ItemResponse, CoinResponse } from "./model";

const ITEMS_ENDPOINT = "https://my.api.mockaroo.com/items.json";
const COIN_PRICE_ENDPOINT = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"
const apiKey = '186acfb0';

const itemsClient = {
  fetchItems : () => axios
    .get(`${ITEMS_ENDPOINT}`, {headers: {'X-API-Key': apiKey}})
    .then((response: ItemResponse) => {
      return response.data
    }),
  getCoinPrice : () => axios
    .get(`${COIN_PRICE_ENDPOINT}`, )
    .then((response: CoinResponse) => {
      return response.data.bpi["USD"]["rate_float"]
    })
};


export default itemsClient