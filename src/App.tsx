import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { Route, match } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from 'reactstrap';

import TradeDetails from './components/TradeDetails'
import UserToggle from './components/UserToggle'
import Trades from "./components/Trades"
import Chat from "./components/Chat"

interface AppProps {
  history: History;
}

type TradesRouteParams = {
  tradeId: string,
  category: 'paid' | 'unpaid'
}

const RoutedTrades : React.FunctionComponent<{ match: match<TradesRouteParams> }> = (props) => {
  const { match: { params: { category, tradeId } } } = props 
  return <><Col xs="4">
      <Trades selectedTradeId={tradeId} category={category} />
    </Col> 
    <Col xs="4">
      { tradeId && <Chat tradeId={tradeId} /> }
    </Col>
    <Col xs="4">
      { tradeId && <TradeDetails tradeId={tradeId} /> }
    </Col>
  </>         
}

const App: React.FunctionComponent<AppProps> = ({ history }) => {
  return (
      <>
        <Navbar color="dark" dark expand="md" key="nav">
            <NavbarBrand href="/">react-ts-bs-redux-starter</NavbarBrand>
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="https://github.com/alexkonovalov">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>
        <ConnectedRouter history={history}>
          <>
          <Container fluid>
            <Row style={{ 'margin-top': '1rem', 'margin-bottom': '1rem' }}>
              <Col>
                <UserToggle/>
              </Col>
            </Row>
            <Row>
              <Route path="/:category" exact component={RoutedTrades} />
              <Route path="/:category/:tradeId" component={RoutedTrades} />               
            </Row>
          </Container>
          </>
        </ConnectedRouter>
      </>
  );
}


export default App;
