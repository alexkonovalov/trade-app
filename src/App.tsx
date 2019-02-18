import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history'
import { Route, Redirect, Switch } from 'react-router-dom';
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
} from 'reactstrap';

import Trades from './components/Trades';

interface AppProps {
  history: History;
}

const App: React.FunctionComponent<AppProps> = ({ history }) => {
  return (
      <>
        <Navbar color='dark' dark expand='md' key='nav'>
            <NavbarBrand href='/'>btc-trade-app</NavbarBrand>
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href='https://github.com/alexkonovalov'>Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>
        <ConnectedRouter history={history}>
          <>
          <Container fluid>
            <Row style={{ 'marginTop': '1rem', 'marginBottom': '1rem' }}>
            <Switch>
              <Route path={'/'} exact><Redirect to={'/notseen'}/></Route>
              <Route path={route.tradeList.path} exact component={Trades} />
              <Route path={route.trade.path} component={Trades} />
            </Switch>
            </Row>
          </Container>
          </>
        </ConnectedRouter>
      </>
  );
}

export default App;
