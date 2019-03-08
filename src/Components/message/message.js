import React, { Component } from "react";
import { Col } from 'reactstrap';
import {  Button, FormGroup, ControlLabel,  FormControl} from 'react-bootstrap';
import './message.css'
import { connect } from 'react-redux';
import { AddMessagegUser} from '../../actions/ActionCreator'
import  MessageComponent  from './message-component'

class Message extends Component  {
  constructor() {
    super()
    this.state = {
      users: [],
      following: [],
      messages: [],     
      name: ""
    };  
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.message.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const message =  this.state.message
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const objMessage = {
       email: this.props.users.users[0].email, 
       message: message, date: date, 
       foto: this.props.users.users[0].picture.large 
    }
    this.props.AddMessagegUser(objMessage)
  }

  componentWillMount() { 
    if(this.props.users.users.length === 0) { 
      this.props.history.replace({pathname: '/Login'}); 
    }
} 

  render() {
    return (
      this.props.users.users.length > 0 &&
      <div className="Row">
        <Col className="cont" xs="4" sm="4" md="4"></Col>
        <Col className="cont" xs="4" sm="4" md="4">
          <h1 className="h1"> Write a message..</h1>
          <form  onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.props.users.users[0].email}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="message">
              <ControlLabel>Message</ControlLabel>
              <FormControl componentClass="textarea" placeholder="message" onChange={this.handleChange} />
            </FormGroup>
            <Button
              block
              bsStyle="info"
              bsSize="large"
              type="submit">
                Post
            </Button>
          </form>
          <Col xs="3" sm="3" md="3"></Col>
        </Col>
        <Col className="cont" xs="4" sm="4" md="4"></Col>
        <h2>Timeline</h2>
        <MessageComponent user={this.props.users.users[0].email} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    following: state.following,
    message : state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddMessagegUser: (message) => {
      dispatch(AddMessagegUser(message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
      
  