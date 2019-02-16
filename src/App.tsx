import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { Route, match } from 'react-router-dom';
import route from './core/routes';

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

import Trades from './components/Trades'

interface AppProps {
  history: History;
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
              <Route path={route.tradeList.path} exact component={Trades} />
              <Route path={route.trade.path} component={Trades} />
            </Row>
          </Container>
          </>
        </ConnectedRouter>
      </>
  );
}

export default App;
