import React from 'react';
import { State } from '../core/model'
import { connect } from 'react-redux';

const mapStateToProps = (state: { reducer: State }) => ({ coinPrice : state.reducer.coinPrice });

const TradeDetails: React.SFC<ReturnType<typeof mapStateToProps>> = (props) => (
  <div>Trade Details {props.coinPrice}</div>
)

export default connect(mapStateToProps)(TradeDetails)