import React from 'react';
import styled from 'styled-components';

import { Trade } from '../../core/model'
import { toBtcString } from '../../core/calc.helpers'

const Img = styled.img`
  border-radius: 40px;
  margin: 5px;
`

const TraderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TraderTitle = styled.div`
  text-align: center;
`

const RatingBadge: React.FunctionComponent<{plusCount: number, minusCount: number}> = ({plusCount, minusCount}) => {
  const Positive = styled.span`
    color: #28a745;
  `

  const Negative = styled.span`
    color: #dc3545;
  `

  return <div>
    <Positive>+{plusCount}</Positive> / <Negative>{minusCount}</Negative>
  </div>
}

const TradePropertyItem: React.FunctionComponent<{name: string, value: string}> = ({name, value}) => {
  const TradeProperty = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
  `

  const TradePropName = styled.div`
    font-weight: bold;
  `

  const TradePropValue = styled.div`
    color: #777;
  `

  return <TradeProperty>
    <TradePropName>{name}</TradePropName>
    <TradePropValue>{value}</TradePropValue>
  </TradeProperty>
}

type ComponentOwnProperties = {
  trade: Trade;
  coinPrice: number | undefined;
};

const IMG_SIZE = 80;

const TradeDetails: React.FunctionComponent<ComponentOwnProperties> = (props) => {
 const { trade, coinPrice } = props;

 return <>
    <TraderInfo>
      <TraderTitle>You are trading with <b>{trade.buyerInfo.name}</b></TraderTitle>
      <Img src={trade.buyerInfo.imgSrc} width={IMG_SIZE} height={IMG_SIZE}/>
      <RatingBadge
        plusCount={trade.buyerInfo.rating.positive}
        minusCount={trade.buyerInfo.rating.negative}        
      />
    </TraderInfo>
    <TradePropertyItem name={'Payment Method'} value={trade.paymentMethod} />
    <TradePropertyItem name={'Price(USD)'} value={`${trade.price}`} />
    <TradePropertyItem name={'Price(BTC)'} value={`${coinPrice && toBtcString(trade.price, coinPrice) }`} />
    <TradePropertyItem name={'Hash'} value={trade.id} />
  </>
}

export default (TradeDetails)