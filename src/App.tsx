import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
  DropdownItem } from "reactstrap";
import Items from "./components/Items"
import Chat from "./components/Chat"

/* import './App.scss'; */

const mapStateToProps = (state :any) => ({
  ...state
 })

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }: any) => (
  <div>
    <h2>Topics <Button color="danger">Danger!</Button> </h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }: any) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => {
  return (

      <div className="App">
        <Navbar color="dark" dark expand="md" key="nav">
            <NavbarBrand href="/" className="mr-auto">react-ts-bs-redux-starter</NavbarBrand>
            <Collapse isOpen={false} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="https://github.com/alexkonovalov">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Navbar>
        <header className="App-header">
        <ConnectedRouter history={history}>
          <>
          <Route path="/:category" exact component={Items} />
          <Route path="/:category/:id" component={Items} />
          <Route path="/chat/:tradeId" component={Chat} />
          </>
          {/* <Items /> */}
{/*           <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} /> 
          </div>*/} 
        </ConnectedRouter>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {
              JSON.stringify({ sdfsdf : 'foofofo'})
            }
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}


export default connect(mapStateToProps)(App);
