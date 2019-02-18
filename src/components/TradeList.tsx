import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import styled from 'styled-components'
import { bindActionCreators, Action, Dispatch } from 'redux';
import { Trade, TradesState, AppState } from '../core/model';
import { byUnseenMessageFirst, byPaidFirst, byIsNotReleased } from '../core/sorters';
import route from '../core/routes';
import { Actions } from '../store/actions';
import TradeInfo from './presentational/TradeInfo';

const NavBar = styled.div`
  margin-bottom: 5px;
`;

const StyledLink = styled(Link)`
  color: #FFF;
  margin-right: 5px;
`

const mapStateToProps = (state: { tradeState: TradesState, appState: AppState }) => ({
  trades : state.tradeState.trades,
  bitcoinPrice: state.appState.coinPrice
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProps = {
  selectedTradeId: string;
  filter: 'notseen' | 'paid';
};

const TradeList : React.FunctionComponent<ComponentOwnProps & ReturnType<typeof mapStateToProps> & typeof Actions> =
  (props) => {

  const { trades, selectedTradeId, filter, bitcoinPrice } = props;

  const getSortByFunction = () => {
    switch (filter) {
      case ('paid'): return byPaidFirst;
      case ('notseen'): return byUnseenMessageFirst
    }
  }

  const shownTrades = trades
    .sort((a, b) => byIsNotReleased(a,b) || getSortByFunction()(a,b))
    .map<[Trade, boolean]>((trade) => [trade, trade.id === selectedTradeId]);

  return (
      <>
        <NavBar>
          <StyledLink to={route.tradeList.getPath('notseen')}><Button>Not Seen First</Button></StyledLink>
          <StyledLink to={route.tradeList.getPath('paid')}><Button>Paid First</Button></StyledLink>
        </NavBar>
          { shownTrades.map(([trade, isSelected])=> <TradeInfo
              key={trade.id}
              trade={trade}
              btcPrice={bitcoinPrice}
              isSelected={isSelected}
              linkPath={route.trade.getPath(filter, trade.id)} />
          )}
      </>
    );
  }

export default connect(mapStateToProps, mapDispatchToProps)(TradeList);