import React from 'react';
import { Col} from 'reactstrap';
import './profile.css'
import { connect } from 'react-redux';
import MessageComponent  from '../message/message-component'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      messages: [],     
    }
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
        <Col xs="12" sm="12" md="12">
          <article id="top" className="wrapper style1">
            <div className="container">
              <div className="row">
                <div className="col-4 col-5-large col-12-medium">
                  <span className="image fit"><img src={ this.props.users.users[0].picture.large } alt="" /></span>
                </div>
                <div className="col-8 col-7-large col-12-medium text-center">
                  <header>
                    <h1>
                      <strong>
                        { this.props.users.users[0].name.title } 
                        { this.props.users.users[0].name.first } 
                        { this.props.users.users[0].name.last }
                      </strong>
                    </h1>
                  </header>
                  <p>{this.props.users.users[0].email}</p>
                  <p> 
                    {this.props.users.users[0].location.state}, 
                    {this.props.users.users[0].location.city}, 
                    {this.props.users.users[0].location.street}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Col>
        <Col xs="4" sm="4" md="4"></Col>
        <MessageComponent user={this.props.users.users[0].email} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    message : state.message
  };
};

export default connect(mapStateToProps, null)(Profile)
