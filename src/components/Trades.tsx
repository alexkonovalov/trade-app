import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from "redux";
import { Col } from 'reactstrap';

import { State } from '../core/model'
import { Redirect } from 'react-router-dom'
import routes, { ITradeRouteParams } from '../core/routes'
import { getRouteParams, RouteProps } from '../core/routes.helpers'
import { Actions } from '../store/actions';
import TradeDetails from './presentational/TradeDetails'
import TradeList from './TradeList'
import TradeChat from './TradeChat'
import UserActions from './UserActions'

const mapStateToProps = (state: { reducer: State }) => ({
  items : state.reducer.trades,
  btcPrice: state.reducer.coinPrice
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

const Trades : React.FunctionComponent<ReturnType<typeof mapStateToProps> & RouteProps<ITradeRouteParams>> = (props) => {

  const { items, btcPrice  } = props
  const { tradeId : selectedTradeId, category } = getRouteParams(props)

  const selectedTrade = selectedTradeId && items
    .filter((trade) => trade.id === selectedTradeId)[0]

  if(selectedTradeId && !selectedTrade) {
    return <Redirect to={routes.tradeCategory.getPath(category)} />
  }

  return <>
    <Col xs="4">
      <TradeList category={category} selectedTradeId={selectedTradeId} />
    </Col>
    <Col xs="4">
      { selectedTradeId && <TradeChat tradeId={selectedTradeId} /> }
    </Col>
    <Col xs="4">
      <UserActions tradeId={selectedTradeId} />
      { selectedTrade && <TradeDetails trade={selectedTrade} coinPrice={btcPrice}/> }
    </Col>
  </>
}

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
