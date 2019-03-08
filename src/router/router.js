import React, { Component } from "react";
import { connect } from 'react-redux';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom'
import {Navbar, NavItem, Nav}  from "react-bootstrap";
import Home from '../Components/Home/Home'
import LoginConnect from '../Components/Login/login-component'
import Message from '../Components/message/message'
import Profile from '../Components/profile/profile'
import Profiles from '../Components/profile/profiles'
import Friends from '../Components/friend/friend';
import Request from '../Components/friend/request';
import { removeLoginuser } from '../actions/ActionCreator'

class AppRoutes extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true,
      users: [] 
    };
  }

  componentWillReceiveProps(nextProps) {
       this.setState({users: nextProps.users})
  }

  render() { 
    return(
      <BrowserRouter>
        <header className="App-header">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink className="App-title" exact to="/">KeepSocial</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.props.users.users.length === 0 && 
              <NavItem eventKey={1} href="/Login">
                Login   
            </NavItem> }
            {this.props.users.users.length > 0 && 
              <NavItem eventKey={2} href="/Message">
                Message 
            </NavItem> }
               {this.props.users.users.length > 0 && 
              <NavItem eventKey={3} href="/Request">
                Request
              </NavItem> }
              {this.props.users.users.length > 0 && 
              <NavItem eventKey={4} href="/Friends">
                Friends
              </NavItem>  } 
              {this.props.users.users.length > 0 && 
              <NavItem eventKey={5} href="/MyProfile">
                Profile
              </NavItem> }
              {this.props.users.users.length > 0 && 
              <NavItem eventKey={5} onClick={() =>   this.props.removeLoginuser(this.props.users)} href="/Login">
                Logout
              </NavItem> 
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </header>
        <Switch>
          <Route exact path='/' component={Home} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Message' component={Message} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Request' component={Request} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Friends' component={Friends} onEnter={this.state.isAuthenticated} />
          <Route exact path='/MyProfile' component={Profiles} onEnter={this.state.isAuthenticated} />
          <Route exact path='/Profile/:handle' component={Profile}  />
          <Route exact path='/Login' component={LoginConnect} />
        </Switch>     
      </BrowserRouter> 
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchTopropsAction =  dispatch => ({
  removeLoginuser: value => dispatch(removeLoginuser(value))
})

const AppRoutesConnect = connect(mapStateToProps, mapDispatchTopropsAction)(AppRoutes)

export default AppRoutesConnect;
    

   

   


