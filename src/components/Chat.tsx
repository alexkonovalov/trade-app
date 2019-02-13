import React, { Component, useState, ChangeEvent } from 'react';
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
import { Item, ItemCategories, State, Chats } from '../core/model'
import Message, { messageType } from './Message'
import { Actions, ActionCreators, EffectActions } from "../store/actions";

import styled from 'styled-components';

const MessageUl = styled.ul`
  list-style: none;
  padding: 0;
`

interface ItemsProps {
  chats: Chats,
  match: match<ChatRouteParams>
}

type ViewItem = Item & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ 
  items : state.reducer.items,
  viewMode: state.reducer.viewAs,
  chats : state.reducer.chats
 });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ChatRouteParams = {
  tradeId: string
}

const Chat: React.SFC<ReturnType<typeof mapStateToProps> & typeof Actions & { match: match<ChatRouteParams> }>  = (props) => {

  const [ newMessage, setNewMessage] = useState('');
  const { chats, viewMode, match: { params }, addMessage } = props 
  const messages = params.tradeId && chats[params.tradeId]

  const send = () => {
    setNewMessage('')
    addMessage({ tradeId: params.tradeId, message: { content: newMessage, sender: viewMode }});
  }

  const handleMessageInputChange = (e:  ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }

  return (
      <div>
        { messages && messages.map(message => <MessageUl>
            <Message  type={message.sender === viewMode ? 'sent' : 'received' }
                      message={message.content}
                      imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
          </MessageUl>)
        }
        <InputGroup>
          <Input type={'textarea'} placeholder={'Enter your message here'} value={newMessage} onChange={handleMessageInputChange} />
          <InputGroupAddon addonType="append"><Button color="secondary" onClick={send}>Send</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat);