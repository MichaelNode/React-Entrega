import React, { Component}  from 'react';
import {Link} from 'react-router-dom'
import './friend.css'
import { connect } from 'react-redux';
import { addFollowingUser } from '../../actions/ActionCreator'
import { Col,Card, CardImg, 
         CardText, CardBody, 
         CardTitle, CardSubtitle} from 'reactstrap';

class friend extends Component {
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
        var  res = []
        data.results.map((pic)  => {
            this.props.following.following.map((foll) => {
            if(pic.email === foll.email 
                && this.props.users.users[0].email === foll.user 
                && foll.friend !== 'refuse' )
                    res.push(pic)
                    return res    
            })
            return res
        })
        let pictures = res.map((pic) => {
            return(
                { 'pic':pic.picture.large,
                  'name':`${pic.name.title} ${pic.name.first} ${pic.name.last}`,
                  'email': pic.email 
                }  
            )
        })
        this.setState({pictures: pictures, name : pictures});
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
                            <CardSubtitle> </CardSubtitle>
                        </CardBody>
                        <CardImg width="100%" src={pic.pic}  alt="Card image cap" />
                        <CardBody>
                            <CardText>{pic.email}</CardText>
                            {this.props.following.following.length > 0  
                                && this.props.following.following.find(foll => foll.email === pic.email 
                                    & foll.user === this.props.users.users[0].email 
                                    & foll.friend === 'accepted'  )  ? 
                                        <Link to={'/Profile/' + pic.email } >  Profile  </Link> :null        
                            } 
                            {this.props.following.following.length > 0  
                                && this.props.following.following.find(foll => foll.email === pic.email 
                                    & foll.user === this.props.users.users[0].email 
                                    & foll.friend === 'sent'  )  ? 
                                        <p className="status">  Sent Requests  </p> :null                
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(friend);