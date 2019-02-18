import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from "redux";

import { TradesState, AppState } from '../core/model';
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
  const { tradeId, chats, viewMode, addMessage, markTradeMessagesAsRead, fetchMessages } = props;

  const chat = chats[tradeId];

  useEffect(() => {
    if (viewMode === 'seller') {
      markTradeMessagesAsRead(tradeId)
    }
    if (!chats[tradeId]) {
      console.log('no chatt!!!')
      fetchMessages(tradeId)
    }
  });

  const messages = tradeId
    ? (chat && chat.messages || []).map(tradeMessage => ({ 
      content: tradeMessage.content,
      type: tradeMessage.sender === viewMode ?  'sent' : 'received' as 'sent' | 'received'
    }))
    : [];

  const sendMessage = (content: string) => {
    addMessage({ tradeId, message: { content, sender: viewMode }});
  }

  return (messages && <Chat onAddMessage={sendMessage} messages={messages} />);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TradeChat);