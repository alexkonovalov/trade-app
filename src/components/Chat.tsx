import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
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

type ViewItem = Item & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ 
  items : state.reducer.items,
  viewMode: state.reducer.viewAs,
  chats : state.reducer.chats
 });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProperties = {
  tradeId: string
}

const Chat: React.FunctionComponent<ComponentOwnProperties & ReturnType<typeof mapStateToProps> & typeof Actions>  = (props) => {

  const { tradeId } = props 

  const [ newMessage, setNewMessage] = useState('');
  const { chats, viewMode, addMessage } = props 
  const messages = tradeId && chats[tradeId]

  const send = () => {
    setNewMessage('')
    addMessage({ tradeId, message: { content: newMessage, sender: viewMode }});
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