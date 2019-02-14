import React from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
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
} from "reactstrap";
import { bindActionCreators, Action, Dispatch } from "redux";
import { Trade, TradeStatus, State } from '../core/model'
import { Actions } from "../store/actions";

type ViewTrade = Trade & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ items : state.reducer.trades });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProps = {
  selectedTradeId: string,
  category: TradeStatus
}

const Trades : React.FunctionComponent<ComponentOwnProps & ReturnType<typeof mapStateToProps> & typeof Actions> =
  (props) => {

  const { items, selectedTradeId, category } = props 

  const shownTrades: Array<ViewTrade> = items
    .filter(item => item.status === category)
    .map((trade) => ({
      ...trade,
      isSelected: trade.id === selectedTradeId
    }))

  return (
      <div>
          <Nav tabs>
          <NavItem>
            <Link to="/unpaid">
              <NavLink className={classnames({ active: category === 'unpaid' })}>
                Not Paid
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/paid">
              <NavLink className={classnames({ active: category === 'paid' })}>
                Paid 
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
          { shownTrades.map(trade => (<Card {...trade.isSelected && { color: "primary" }} > 
             <CardBody>
               <CardTitle>{trade.id}</CardTitle>
               <CardSubtitle>Card subtitle</CardSubtitle>
               <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
               <Link to={`/${trade.status}/${trade.id}`}><Button>Select</Button></Link>
             </CardBody>
           </Card>)
           )
          }
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Trades);