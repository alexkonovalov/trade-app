import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'reactstrap'
import { bindActionCreators, Action, Dispatch } from 'redux';
import { AppState } from '../core/model'
import { Actions } from '../store/actions';

const mapStateToProps = (state: { appState: AppState }) => ({ viewMode : state.appState.viewAs });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

const ActionButton = styled(Button)`
  margin-top: 3px;
  margin-bottom: 3px;
  width: 100%;
`

type ComponentOwnProps = {
  tradeId: string,
  showTradeActions: boolean
}

const UserActions: React.FunctionComponent<ComponentOwnProps & ReturnType<typeof mapStateToProps> & typeof Actions> = (props) => {
  const { tradeId, viewMode, switchView, deleteTrade, releaseTrade, showTradeActions } = props;

  return <>
    <ActionButton color='primary' onClick={switchView}>
      Switch to {viewMode === 'buyer' ? 'Seller' : 'Buyer'}'s View
    </ActionButton>
    { tradeId && showTradeActions && <>
        <ActionButton color='success' onClick={() => releaseTrade(tradeId)} >
          Release Bitcoins
        </ActionButton>
        <ActionButton color="danger" onClick={() => deleteTrade(tradeId)}>
          Cancel Trade
        </ActionButton>
      </>
    }
  </>
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
