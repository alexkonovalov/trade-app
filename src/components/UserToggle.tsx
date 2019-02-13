import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'reactstrap'
import { bindActionCreators, Action, Dispatch } from "redux";
import { State } from '../core/model'
import { Actions } from "../store/actions";

const mapStateToProps = (state: { reducer: State }) => ({ viewMode : state.reducer.viewAs });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

const UserToggle: React.SFC<ReturnType<typeof mapStateToProps> & typeof Actions> = (props) => {
  const { viewMode, switchView } = props;
  return <Button color="primary" onClick={switchView}>
    Switch to {viewMode === 'buyer' ? 'Seller' : 'Buyer'}'s View
  </Button>
}

export default connect(mapStateToProps, mapDispatchToProps)(UserToggle);
