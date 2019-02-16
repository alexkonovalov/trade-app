import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { Trade } from '../../core/model'
import { toBtcString } from '../../core/calc.helpers'

const Dot = styled.div`
  height: 15px;
  width: 15px;
  background-color: #6c757d;
  border-radius: 50%;
  display: inline-block;
`

const UnreadMessageDot = styled(Dot)`
  background-color: #28a745;
`

type TradeInfoProps = {
  trade: Trade,
  isSelected: boolean,
  btcPrice: number | undefined,
  linkPath: string
}

const TradeInfo : React.FunctionComponent<TradeInfoProps> = (props : TradeInfoProps) => {
  const { trade, btcPrice, isSelected, linkPath } = props 

  return <Card {...isSelected && { color: "primary" }} > 
  <CardBody>
    <CardSubtitle>{trade.buyer.name} is buying</CardSubtitle>
    <CardTitle><b>
      {trade.paymentMethod}</b>
      {trade.hasUnreadMessage ? <UnreadMessageDot /> : <Dot />}
      </CardTitle>
    <CardSubtitle>{trade.price} USD ({btcPrice && toBtcString(trade.price, btcPrice) } BTC)</CardSubtitle>
    <Link to={linkPath}><Button>Select</Button></Link>
  </CardBody>
</Card>
}

export default TradeInfo;