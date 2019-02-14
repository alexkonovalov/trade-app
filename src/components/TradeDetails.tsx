import React from 'react';
import { State } from '../core/model'
import { connect } from 'react-redux';

const mapStateToProps = (state: { reducer: State }) => ({ coinPrice : state.reducer.coinPrice });

type ComponentOwnProperties = {
  tradeId: string
}

const TradeDetails: React.FunctionComponent<ComponentOwnProperties & ReturnType<typeof mapStateToProps>> = (props) => (
  <>
    <div>Trade Details {props.coinPrice}</div>
    <div>Trade HASH {props.tradeId}</div>
  </>
)

export default connect(mapStateToProps)(TradeDetails)