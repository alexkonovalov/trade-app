import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  border-radius: 5px;
  margin: 5px;
`

const MessageLi = styled.li`
  display: flex;
`

const MessageLiContent = styled.div`
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

type ComponentOwnProps = {
  imgSrc?: string;
  attachedSrc?: string;
  message: string;
  type: 'sent' | 'received';
};


const IMG_SIZE = 60;

const Message : React.FunctionComponent<ComponentOwnProps> = (props : ComponentOwnProps) => {
  const { attachedSrc, type, imgSrc, message } = props;

  const renderAttachment = () => attachedSrc && <div><a href={attachedSrc} download>Attachment</a></div>

  switch (type) {
    case 'received': return <RecievedMessageLi>
        {imgSrc && <Img src={imgSrc} width={IMG_SIZE} height={IMG_SIZE} />}
        <RecievedMessageLiContent>
          <div>{message}</div>
          { renderAttachment() }
        </RecievedMessageLiContent>
      </RecievedMessageLi>;
    case 'sent': return <SentMessageLi>
        {imgSrc && <Img src={imgSrc} width={IMG_SIZE} height={IMG_SIZE} />}
        <SentMessageLiContent>
          <div>{message}</div>
          { renderAttachment() }
        </SentMessageLiContent>
      </SentMessageLi>;
  }
}

export default Message;