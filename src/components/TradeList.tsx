import React from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import TradeInfo from './presentational/TradeInfo'
import {
  Collapse,
  Navbar,
  Button,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { bindActionCreators, Action, Dispatch } from 'redux';
import { Trade, TradeStatus, State } from '../core/model'
import { byUnseenMessageFirst, byPaidFirst, byIsNotReleased } from '../core/sorters'
import route from '../core/routes'
import { Actions } from '../store/actions';

type ViewTrade = Trade & { isSelected: boolean };

const mapStateToProps = (state: { reducer: State }) => ({
  items : state.reducer.trades,
  bitcoinPrice: state.reducer.coinPrice
});
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProps = {
  selectedTradeId: string;
  filter: 'notseen' | 'paid';
};

const TradeList : React.FunctionComponent<ComponentOwnProps & ReturnType<typeof mapStateToProps> & typeof Actions> =
  (props) => {

  const { items, selectedTradeId, filter, bitcoinPrice } = props;

  const getSortByFunction = () => {
    switch (filter) {
      case ('paid'): return byPaidFirst;
      case ('notseen'): return byUnseenMessageFirst
    }
  }

  const shownTrades: Array<ViewTrade> = items
    .sort((a, b) => byIsNotReleased(a,b) || getSortByFunction()(a,b))
    .map((trade) => ({
      ...trade,
      isSelected: trade.id === selectedTradeId
    }));

  return (
      <div>
          <Nav tabs>
          <NavItem>
            <Link to={route.tradeList.getPath('notseen')}>
              <NavLink className={classnames({ active: filter === 'notseen' })}>
                Not Seen
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to={route.tradeList.getPath('paid')}>
              <NavLink className={classnames({ active: filter === 'paid' })}>
                Paid 
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
          { shownTrades.map(trade => <TradeInfo
              trade={trade}
              btcPrice={bitcoinPrice}
              isSelected={trade.isSelected}
              linkPath={route.trade.getPath(filter, trade.id)} />
          )}
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(TradeList);