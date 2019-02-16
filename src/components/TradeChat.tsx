import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Action, Dispatch } from "redux";

import { State } from '../core/model';
import { Actions } from '../store/actions';
import Chat from './presentational/Chat';

const mapStateToProps = (state: { reducer: State }) => ({ 
  trades : state.reducer.trades,
  viewMode: state.reducer.viewAs,
  chats : state.reducer.chats
 });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProperties = {
  tradeId: string;
};

const TradeChat: React.FunctionComponent<ComponentOwnProperties & ReturnType<typeof mapStateToProps> & typeof Actions>  = (props) => {
  const { tradeId, chats, viewMode, addMessage, markTradeMessagesAsRead } = props;

  useEffect(() => {
    if (viewMode === 'seller') {
      markTradeMessagesAsRead(tradeId)
    }
  });

  const messages = tradeId
    ? chats[tradeId].map(tradeMessage => ({ 
      content: tradeMessage.content,
      type: tradeMessage.sender === viewMode ? 'sent' : 'received' as 'sent' | 'received'
    }))
    : [];

  const sendMessage = (content: string) => {
    addMessage({ tradeId, message: { content, sender: viewMode }});
  }

  return (messages && <Chat onAddMessage={sendMessage} messages={messages} />);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TradeChat);