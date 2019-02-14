import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { Trade } from '../../core/model'

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
    <CardTitle><b>{trade.paymentMethod}</b></CardTitle>
    <CardSubtitle>{trade.price} USD ({btcPrice && (trade.price / btcPrice).toPrecision(8) } BTC)</CardSubtitle>
    <Link to={linkPath}><Button>Select</Button></Link>
  </CardBody>
</Card>
}

export default TradeInfo;