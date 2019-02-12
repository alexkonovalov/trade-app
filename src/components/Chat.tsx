import React, { Component } from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { BrowserRouter as Router, Route, Link, match } from 'react-router-dom';
import classnames from 'classnames';
import {
  Collapse,
  Navbar,
  Button,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from "reactstrap";
import { bindActionCreators, Action, ActionCreatorsMapObject, Dispatch } from "redux";
import { Item, ItemCategories, State } from '../core/model'
import { Actions, ActionCreators, EffectActions } from "../store/actions";


interface ItemsProps {
  
  items: Array<Item>,
  match: match<ItemsRouteParams>
}

type ViewItem = Item & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ items : state.reducer.items });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ItemsRouteParams = {
  id: string,
  category: ItemCategories
}

const Chat = (props : ItemsProps) => {

  const { items, match: { params } } = props 

  return (
      <div>
          CHATT
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat);