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
  CardHeader
} from "reactstrap";

import { Trade } from '../../core/model'
import { toBtcString } from '../../core/calc.helpers'

const Dot = styled.div`
  height: 15px;
  width: 15px;
  margin-right: 15px;
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

  return <Card {...isSelected && { inverse: true, color: 'primary' }} >
  <CardHeader>
    {trade.hasUnreadMessage ? <UnreadMessageDot /> : <Dot />}
    {trade.paymentMethod}
    
  </CardHeader>
  <CardBody>
    <CardTitle><b>{trade.buyerInfo.name}</b> is buying </CardTitle>
    <CardSubtitle>{trade.price} USD ({btcPrice && toBtcString(trade.price, btcPrice) } BTC)</CardSubtitle>
    <CardTitle>{trade.isReleased && <Badge>Released</Badge>}
    {trade.status === 'paid' && <Badge color='success'>Paid</Badge>}
    </CardTitle>
    <Link to={linkPath}><Button >Select</Button></Link>
  </CardBody>
</Card>
}

export default TradeInfo;