import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from "redux";
import { Col, Alert } from 'reactstrap';

import { TradesState, AppState } from '../core/model'
import { Redirect } from 'react-router-dom'
import routes, { ITradeRouteParams } from '../core/routes'
import { getRouteParams, RouteProps } from '../core/routes.helpers'
import { Actions } from '../store/actions';
import TradeDetails from './presentational/TradeDetails';
import TradeList from './TradeList';
import TradeChat from './TradeChat';
import UserActions from './UserActions';

const mapStateToProps = (state: { tradeState: TradesState, appState: AppState }) => ({
  items : state.tradeState.trades,
  btcPrice: state.appState.coinPrice,
  viewAs: state.appState.viewAs,
  appError: state.appState.error
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

const Trades : React.FunctionComponent<ReturnType<typeof mapStateToProps> & RouteProps<ITradeRouteParams>> = (props) => {

  const { appError, items, btcPrice, viewAs } = props
  const { tradeId : selectedTradeId, filter } = getRouteParams(props)

  const selectedTrade = selectedTradeId && items
    .filter((trade) => trade.id === selectedTradeId)[0]

  if(appError) {
    return <Alert color='danger'>Error: {appError}</Alert>
  }
  if(selectedTradeId && !selectedTrade) {
    return <Redirect to={routes.tradeList.getPath(filter)} />
  }

  return <>
    <Col xs="4">
      <TradeList filter={filter} selectedTradeId={selectedTradeId} />
    </Col>
    <Col xs="4">
      { selectedTradeId && <TradeChat tradeId={selectedTradeId} /> }
    </Col>
    <Col xs="4">
      <UserActions tradeId={selectedTradeId} showTradeActions={viewAs === 'seller'}/>
      { selectedTrade && viewAs === 'seller' && <TradeDetails trade={selectedTrade} coinPrice={btcPrice}/> }
    </Col>
  </>
}

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
