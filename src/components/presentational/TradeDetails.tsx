import React from 'react';
import { Trade } from '../../core/model'

type ComponentOwnProperties = {
  trade: Trade;
  coinPrice: number | undefined;
};

const TradeDetails: React.FunctionComponent<ComponentOwnProperties> = (props) => {
 const { trade, coinPrice } = props;

 return <>
    <div>{trade.buyer.name} is buying</div>
    <div><b>{trade.paymentMethod}</b></div>
    <div>{trade.price} USD ({coinPrice && (trade.price / coinPrice).toPrecision(8) } BTC)</div>
    <div>Trade Details {props.coinPrice}</div>
    <div>Trade HASH {trade.id}</div>
  </>
}

export default (TradeDetails)