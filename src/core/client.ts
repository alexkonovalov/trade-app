import axios from "axios";

import { ItemResponse } from "./model";

const ITEMS_ENDPOINT = "https://my.api.mockaroo.com/items.json";
const apiKey = '186acfb0';

const itemsClient = {
  fetchItems : () => axios
    .get(`${ITEMS_ENDPOINT}`, {headers: {'X-API-Key': apiKey}})
    .then((response: ItemResponse) => {
      return response.data
    })
};

export default itemsClient