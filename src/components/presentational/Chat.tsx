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
  messages: { content: string, type: messageType }[];
  onAddMessage: (messageContent: string) => void;
};

const Chat: React.FunctionComponent<ComponentOwnProperties>  = (props) => {

  const [ newMessage, setNewMessage] = useState('');
  const { messages, onAddMessage } = props;

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
            <Message  type={message.type }
                      message={message.content}
                      imgSrc={'https://pbs.twimg.com/profile_images/585938291330912256/5Z02N-AP_400x400.jpg'} />
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