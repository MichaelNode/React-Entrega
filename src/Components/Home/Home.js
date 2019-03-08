import React, { Component}  from 'react';
import {Link} from 'react-router-dom'
import './home.css'
import { connect } from 'react-redux';
import { addFollowingUser } from '../../actions/ActionCreator'
import { Col,Card,  
         CardImg, CardText, 
         CardBody, CardTitle, 
         Button } from 'reactstrap';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            users: [],
            following: []
        };
    }

    componentDidMount() {
        const data = require('../../Data/user.json')
        if(this.props.users.users.length > 0) {
        let pictures = data.results.filter(user => user.email !==  this.props.users.users[0].email)
            .map((pic) => {
                return(
                    { 
                        'pic':pic.picture.large,
                        'name':`${pic.name.title} ${pic.name.first} ${pic.name.last}`,
                        'email': pic.email
                       
                    }  
                )
            })
        this.setState({pictures: pictures, name : pictures});
     }
    };

    componentWillMount() { 
        if(this.props.users.users.length === 0) { 
          this.props.history.replace({pathname: '/Login'}); 
        }
    } 
 
    render() {
        return(
            this.state.pictures &&
            this.state.pictures.map( pic => 
                <Col key={pic.email} className="div" xs={2} md={2} xl={2}>
                    <Card>
                        <CardBody>
                            <CardTitle>{pic.name}</CardTitle>
                        </CardBody>
                        <CardImg width="100%" src={pic.pic}  alt="Card image cap" />
                        <CardBody>
                            <CardText>{pic.email}</CardText>
                            {this.props.following.following.length > 0   
                                && this.props.following.following.find(foll => foll.email === pic.email 
                                    & foll.friend === 'accepted' 
                                    & foll.user === this.props.users.users[0].email ) ? 
                                        <Link to={'/Profile/' + pic.email } >  Profile  </Link> : null        
                            } 
                            {this.props.following.following.length > 0  
                                 && this.props.following.following.find(foll => foll.email === pic.email 
                                    &  foll.friend === 'sent' 
                                    & foll.user === this.props.users.users[0].email ) ? 
                                        <p className="status">  Sent Requests  </p> : null        
                            } 
                            {this.props.following.following.length > 0  
                                && this.props.following.following.find(foll => foll.email === pic.email  
                                    & foll.user === this.props.users.users[0].email  )  ? 
                                        null : <Button size="lg" color="info" onClick={() => 
                                            this.props.addFollowingUser({
                                                'email': pic.email,
                                                'name': pic.name,
                                                'pic': pic.pic,
                                                'user': this.props.users.users[0].email,
                                                'friend': 'sent'
                                            })}>Follow</Button>               
                            }   
                        </CardBody>
                    </Card> 
                </Col>  
            )  
        )
    }
}

 const mapStateToProps = (state) => {
    return {
      users: state.users,
      following: state.following
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      addFollowingUser: (following) => {
        dispatch(addFollowingUser(following))
      }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Home)
  
 