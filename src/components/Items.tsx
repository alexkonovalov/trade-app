import React from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { bindActionCreators, Action, Dispatch } from "redux";
import { Item, ItemCategories, State } from '../core/model'
import { Actions } from "../store/actions";

type ViewItem = Item & { isSelected: boolean }

const mapStateToProps = (state: { reducer: State }) => ({ items : state.reducer.items });
const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators(Actions, dispatch);

type ComponentOwnProps = {
  selectedTradeId: string,
  category: ItemCategories
}

const Items : React.FunctionComponent<ComponentOwnProps & ReturnType<typeof mapStateToProps> & typeof Actions> =
  (props) => {

  const { items, selectedTradeId, category } = props 

  const shownItems: Array<ViewItem> = items
    .filter(item => item.category === category)
    .map((item) => ({
      ...item,
      isSelected: item.id === selectedTradeId
    }))

  return (
      <div>
          <Nav tabs>
          <NavItem>
            <Link to="/alive">
              <NavLink
                className={classnames({ active: category === 'alive' })}
                onClick={() => { console.log('tab 1 click') }}
              >
                Alive 
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/dead">
              <NavLink
                className={classnames({ active: category === 'dead' })}
                onClick={() => { console.log('tab 2 click') }}
              >
                dead 
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
          { shownItems.map(item => (<Card {...item.isSelected && { color: "primary" }} > 
             <CardBody>
               <CardTitle>{item.id}</CardTitle>
               <CardSubtitle>Card subtitle</CardSubtitle>
               <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
               <Link to={`/${item.category}/${item.id}`}><Button>Select</Button></Link>
             </CardBody>
           </Card>)
           )
          }
      </div>
    );
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Items);