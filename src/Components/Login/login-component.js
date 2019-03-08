import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoginService from '../../service/login-service';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import { addLoginUser } from '../../actions/ActionCreator'


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const email = this.state.email
    const pass =  this.state.password
    const LoginServiceInstance = new LoginService();
    LoginServiceInstance.Login(email,pass).then(result => {
      return result;
    }).then(data => {
       this.setState({ error: false });
        if (!data) {
        return this.setState({ error: true });
        }
        this.props.addLoginUser(data);
        this.props.history.push('/');       
      }) 
  }

  render() {
    const { error } = this.state;
    return (
      <div className="Login">
        <h1>Login</h1>
        <form error={error.toString()} onSubmit={this.handleSubmit}>
          {error && < Message
          error={error.toString()}
          content="That username/password is incorrect. Try again!" />}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="info"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLoginUser: (users) => {
      dispatch(addLoginUser(users))
    }
  }
}

const LoginConnect = connect(mapStateToProps, mapDispatchToProps)(Login)

export default  LoginConnect;