import React from 'react';
import { Col } from 'reactstrap';
import LoginService from '../../service/login-service';
import './profile.css'
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     user: [],
     name: '',
     city: '',
     state: '',
     street: '',
     picture: '',
     following: [],
     users: [],
     messages: [],   
    }
  }

  componentDidMount () {
    const { handle } = this.props.match.params
    const LoginServiceInstance = new LoginService();
    LoginServiceInstance.Profile(handle).then(result => {
      return result;
      }).then(data => {
        this.setState({ error: false });
        if (!data) {
          return this.setState({ error: true });
        }
    const name = data.name.title + ' ' + data.name.first + ' ' + data.name.last
    this.setState({ 
      user: name, 
      email: data.email, 
      state: data.location.state,  
      city: data.location.city, 
      street: data.location.street, 
      picture: data.picture.large  
    });
    })
  }

  componentWillMount() { 
    if(this.props.users.users.length === 0) { 
      this.props.history.replace({pathname: '/Login'}); 
    }
  }  

  render() {
    return (
      <div className="Row">
        <Col xs="12" sm="12" md="12">
          <article id="top" className="wrapper style1">
            <div className="container">
              <div className="row">
                <div className="col-4 col-5-large col-12-medium">
                  <span className="image fit"><img src={ this.state.picture } alt="" /></span>
                </div>
                <div className="col-8 col-7-large col-12-medium text-center">
                  <header>
                    <h1><strong>{ this.state.user } </strong>.</h1>
                  </header>
                  <p>{ this.state.email}</p>
                  <p> { this.state.state} , { this.state.city} , { this.state.street }</p>
                </div>
              </div>
            </div>
          </article>
        </Col>
        <Col xs="4" sm="4" md="4"></Col>
        <Col className="Row">
          {this.props.following.following.find(foll => foll.email === this.props.match.params.handle 
            & foll.user === this.props.users.users[0].email 
            & foll.friend === 'accepted'  )  ?     
                <section id="timeline">
                { this.props.message.message.filter( mess => mess.email === this.props.match.params.handle ).map( mess => 
                  this.props.following.following.find(foll => foll.email === mess.email & foll.user === this.props.users.users[0].email & foll.friend === 'accepted'  )  ? 
                  <article key={mess.message}>
                    <div className="inner">
                      <span className="date">
                        <span className="day">{ new Date(mess.date).getDate()}<sup>th</sup></span>
                        <span className="month">{new Date(mess.date).getMonth()}</span>
                        <span className="year">{new Date(mess.date).getFullYear()}</span>
                      </span>
                      <h2>{mess.email}</h2> 
                      <p> {mess.message}</p>
                    </div>
                  </article> : <Col className="textr" xs="12" sm="12" md="12">user not followed</Col> 
                )}
                </section>:<div><p className="message">Message: You are not a follower of this user</p></div>
            } 
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    message : state.message,
    following : state.following
  };
};

export default connect(mapStateToProps, null)(Profile)
