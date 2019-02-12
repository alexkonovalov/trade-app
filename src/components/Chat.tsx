import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { BrowserRouter as Router, Route, Link, match } from 'react-router-dom';
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
  Card, CardImg, CardText, CardBody, Media,
  CardTitle, CardSubtitle, Input, InputGroup, InputGroupAddon
} from "reactstrap";
import { bindActionCreators, Action, ActionCreatorsMapObject, Dispatch } from "redux";
import { Item, ItemCategories, State } from '../core/model'
import Message, { messageType } from './Message'
import { Actions, ActionCreators, EffectActions } from "../store/actions";

import styled from 'styled-components';

const MessageUl = styled.ul`
  list-style: none;
  padding: 0;
`

interface ItemsProps {
  items: Array<Item>,
  match: match<ItemsRouteParams>
}

type ViewItem = Item & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ items : state.reducer.items });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ItemsRouteParams = {
  id: string,
  category: ItemCategories
}

const Chat = (props : ItemsProps) => {

  const { items, match: { params } } = props 

  return (
      <div>
        <MessageUl>
          <Message type={'received'} message={'tere bro'} imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
          <Message type={'sent'} message={'tere yo'} imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
          <Message type={'received'} message={'ciao mate'} imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
          <Message type={'sent'} message={'preved medved you'} imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
        </MessageUl>
        <InputGroup>
          <Input type={'textarea'} placeholder={'Enter your message here'} />
          <InputGroupAddon addonType="append"><Button color="secondary">Send</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat);