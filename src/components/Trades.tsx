import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from "redux";
import { Col } from 'reactstrap';

import { State } from '../core/model'
import { Actions } from '../store/actions';

const mapStateToProps = (state: { reducer: State }) => ({
  items : state.reducer.trades,
  btcPrice: state.reducer.coinPrice
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

import { match } from 'react-router-dom';

import TradeDetails from './presentational/TradeDetails'
import TradeList from './TradeList'
import TradeChat from './TradeChat'

type TradesRouteParams = {
  tradeId: string,
  category: 'paid' | 'unpaid'
}

const Trades : React.FunctionComponent<ReturnType<typeof mapStateToProps> & { match: match<TradesRouteParams> }> = (props) => {

  const { items, btcPrice, match: { params: { category, tradeId: selectedTradeId } } } = props

  const selectedTrade = selectedTradeId && items
    .filter((trade) => trade.id === selectedTradeId)[0]

  return <>
    <Col xs="4">
      <TradeList selectedTradeId={selectedTradeId} category={category} />
    </Col> 
    <Col xs="4">
      { selectedTradeId && <TradeChat tradeId={selectedTradeId} /> }
    </Col>
    <Col xs="4">
      { selectedTrade && <TradeDetails trade={selectedTrade} coinPrice={btcPrice}/> }
    </Col>
  </>         
}

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
