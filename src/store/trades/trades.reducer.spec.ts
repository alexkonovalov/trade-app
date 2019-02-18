import { tradesReducer } from './trades.reducer'
import { initalTradeState } from './trades.reducer'
import { TradesActions } from './trades.actions'
import { TradesState, Trade, TradeMessage } from '../../core/model'
import { mockTrade, mockChat } from '../../testing/mocks'

describe('trades.reducer',() => {
  it('should handle AppActions.addTrades', () => {
    const addedTrades : Trade[] = [
      mockTrade, { ...mockTrade, id: 'trade2' }
    ]

    const expectedState: TradesState = { ...initalTradeState,
      trades: addedTrades
    } 

    const result = tradesReducer(initalTradeState, TradesActions.addTrades(addedTrades));
    expect(result).toEqual(expectedState)
  })

  it('should handle AppActions.deleteTrade', () => {
    const inputState: TradesState = { ...initalTradeState,
      trades: [mockTrade, { ...mockTrade, id: 'trade2' } ]
    }

    const expectedState: TradesState = { ...initalTradeState,
      trades: [mockTrade]
    } 

    const result = tradesReducer(inputState, TradesActions.deleteTrade('trade2'))
    expect(result).toEqual(expectedState)
  })

  it('should handle AppActions.releaseTrade', () => {
    const inputState: TradesState = { ...initalTradeState, 
      trades: [mockTrade, { ...mockTrade, id: 'trade2' }]
    }

    const expectedState: TradesState = { ...initalTradeState,
      trades: [mockTrade, {...mockTrade, id: 'trade2', isReleased: true}]
    }

    const action = TradesActions.releaseTrade('trade2')

    expect(tradesReducer(inputState, action)).toEqual(expectedState)
  })

  it('should handle AppActions.addChat', () => {
    const expectedState: TradesState = { ...initalTradeState,
      chats: {[mockTrade.id]: { messages: mockChat }}
    }
    
    const action = TradesActions.addChat({
      tradeId: mockTrade.id,
      messages: mockChat
    })

    expect(tradesReducer(initalTradeState, action)).toEqual(expectedState)
  })

  it('should handle AppActions.addMessage', () => {
    const addedMessage: TradeMessage = {content: 'hey dude', sender: 'buyer' };

    const inputState: TradesState = { 
      trades: [mockTrade],
      chats: {[mockTrade.id]: { messages: mockChat }}
    };

    const expectedState: TradesState = {
      trades: [{...mockTrade, hasUnreadMessage: true }],
      chats: {[mockTrade.id]: { messages: [...mockChat, addedMessage] }}
    };

    const action = TradesActions.addMessage({ tradeId: mockTrade.id, message: addedMessage })

    expect(tradesReducer(inputState, action)).toEqual(expectedState)
  })

  it('should handle AppActions.markChatAsFetching', () => {
    const inputState: TradesState = { ...initalTradeState, 
      chats: {[mockTrade.id]: { isFetching: false }}
    };

    const expectedState: TradesState = { ...initalTradeState,
      chats: {[mockTrade.id]: { isFetching: true }}
    };

    const action = TradesActions.markChatAsFetching(mockTrade.id)

    expect(tradesReducer(inputState, action)).toEqual(expectedState)
  })

  it('should handle AppActions.markChatAsFetched', () => {
    const inputState: TradesState = { ...initalTradeState, 
      chats: {[mockTrade.id]: { isFetching: true }}
    };

    const expectedState: TradesState = { ...initalTradeState,
      chats: {[mockTrade.id]: { isFetching: false }}
    };

    const action = TradesActions.markChatAsFetched(mockTrade.id)

    expect(tradesReducer(inputState, action)).toEqual(expectedState)
  })
})