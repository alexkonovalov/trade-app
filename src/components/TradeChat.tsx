import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from 'redux';

import { TradesState, AppState, GenericMessage } from '../core/model';
import { Actions } from '../store/actions';
import Chat from './presentational/Chat';

const mapStateToProps = (state: { tradeState: TradesState, appState: AppState }) => ({ 
  trades : state.tradeState.trades,
  viewMode: state.appState.viewAs,
  chats : state.tradeState.chats
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProperties = {
  tradeId: string;
};

const TradeChat: React.FunctionComponent<ComponentOwnProperties & ReturnType<typeof mapStateToProps> & typeof Actions>  = (props) => {
  const { tradeId, chats, viewMode, addMessage, markTradeMessagesAsRead, fetchMessages, trades } = props;

  const chat = chats[tradeId];
  const trade = trades.filter(trade => trade.id === tradeId)[0];
  const buyerImgSrc = trade.buyerInfo.imgSrc;

  const messages = (tradeId && chat && chat.messages || [])
    .map<GenericMessage>(tradeMessage => ({ 
      content: tradeMessage.content,
      attachedSrc: tradeMessage.attachedSrc,
      key: tradeMessage.key,
      type: tradeMessage.sender === viewMode ?  'sent' : 'received',
    }));
  
  const sendMessage = (content: string) => {
    addMessage({ tradeId, message: { content, sender: viewMode, key: `${tradeId}.${messages.length}` }});
  }

  useEffect(() => {
    if (viewMode === 'seller' && trade.hasUnreadMessage) {
      markTradeMessagesAsRead(tradeId);
    }
    if (!chats[tradeId]) {
      fetchMessages(tradeId);
    }
  });

  return (messages && <Chat
    onAddMessage={sendMessage}
    messages={messages}
    {...viewMode === 'seller' ? { receiverImgSrc : buyerImgSrc } : { senderImgSrc: buyerImgSrc }}
   />);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TradeChat);