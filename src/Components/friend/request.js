import React, { Component}  from 'react';
import './friend.css'
import { connect } from 'react-redux';
import {  requestAddFollowinguser } from '../../actions/ActionCreator'
import { Col,Card,  CardImg, 
         CardText, CardBody, 
         CardTitle, CardSubtitle, 
         Button} from 'reactstrap';

class request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            res: [],
            users:[],
            following: []
        };
    }

    componentDidMount() {
        const data = require('../../Data/user.json')
        var  res = []
        this.props.following.following.map((foll)  => {
            data.results.map((pic) => {
                if(this.props.users.users[0].email === foll.email 
                    && foll.friend === 'sent' && pic.email === foll.user)
                {
                    res.push(pic)
                    return res  
                }else{
                    return res  
                }
            })
            return res
        })
        let pictures = res.map((pic) => {
            return(
                { 'pic':pic.picture.large,
                'name':`${pic.name.title} ${pic.name.first} ${pic.name.last}`,
                'email': pic.email,
                'user': this.props.users.users[0].email 
            }  
            )
        })
        this.setState({pictures: pictures, name : pictures});
    };

    componentWillReceiveProps(nextProps) {
       this.setState({following: nextProps.followin})  
    }

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
                            <CardSubtitle>{this.props.following.following[0].friend} </CardSubtitle>
                        </CardBody>
                        <CardImg width="100%" src={pic.pic}  alt="Card image cap" />
                        <CardBody>
                            <CardText>{pic.email}</CardText>
                            {this.props.following.following.length > 0  
                                && this.props.following.following.find(foll => foll.email === this.props.users.users[0].email 
                                    & foll.user === pic.email & foll.friend === 'sent'  )  ? 
                                    <div>
                                        <Button className="btn" size="lg" color="info" onClick={() => this.props.requestAddFollowinguser(pic)}> Accept </Button> 
                                        <Button className="btn" size="lg" color="danger" onClick={() => this.Request_de(pic.email)}>Cancel</Button> 
                                    </div>
                                : null        
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
        requestAddFollowinguser: (follow) => {
        dispatch(requestAddFollowinguser(follow))
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(request);
