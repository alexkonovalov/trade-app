import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import Message, { messageType } from './Message'

const MessageUl = styled.ul`
  list-style: none;
  padding: 0;
`

type ComponentOwnProperties = {
  messages: { content: string, type: messageType, attachedSrc?: string }[];
  senderImgSrc?: string;
  receiverImgSrc?: string;
  onAddMessage: (messageContent: string) => void;
};

const Chat: React.FunctionComponent<ComponentOwnProperties>  = (props) => {

  const [ newMessage, setNewMessage] = useState('');
  const { messages, onAddMessage, senderImgSrc, receiverImgSrc } = props;

  const send = () => {
    setNewMessage('');
    onAddMessage(newMessage);
  }

  const handleMessageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }

  return (
      <div>
        { messages && messages.map(message => <MessageUl>
            <Message  type={message.type}
                      message={message.content}
                      attachedSrc={message.attachedSrc}
                      imgSrc={message.type === 'sent' ? senderImgSrc : receiverImgSrc } />
          </MessageUl>)
        }
        <InputGroup>
          <Input type={'textarea'} placeholder={'Enter your message here'} value={newMessage} onChange={handleMessageInputChange} />
          <InputGroupAddon addonType='append'><Button color='secondary' onClick={send}>Send</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );
  }

export default Chat;