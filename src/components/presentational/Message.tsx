import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  border-radius: 5px;
  margin: 5px;
`

const MessageLi = styled.li`
  display: flex;
`

const MessageLiContent = styled.p`
  background-color: #0f0;
  margin: 5px;
  padding: 6px;
  color: #147;
  border-radius: 5px;
`

const RecievedMessageLiContent = styled(MessageLiContent)`
  background-color: #1b3b66;
  color: #FFF;
`

const SentMessageLiContent = styled(MessageLiContent)`
  background-color: #BDE;
  color: #000;
`

const SentMessageLi = styled(MessageLi)`
  flex-direction: row;
`

const RecievedMessageLi = styled(MessageLi)`
  flex-direction: row-reverse;
`

type MessageProps = {
  imgSrc: string;
  message: string;
  type: messageType;
};

export type messageType = 'sent' | 'received';

const IMG_SIZE = 60;

const Message : React.FunctionComponent<MessageProps> = (props : MessageProps) => {
  const { type, imgSrc, message } = props;

  switch (type) {
    case 'received': return <RecievedMessageLi>
        <Img src={imgSrc} width={IMG_SIZE} height={IMG_SIZE} />
        <RecievedMessageLiContent>{message}</RecievedMessageLiContent>
      </RecievedMessageLi>;
    case 'sent': return <SentMessageLi>
        <Img src={imgSrc} width={IMG_SIZE} height={IMG_SIZE} />
        <SentMessageLiContent>{message}</SentMessageLiContent>
      </SentMessageLi>;
  }
}

export default Message;