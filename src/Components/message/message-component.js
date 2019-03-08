import React, { Component } from "react";
import { Col } from 'reactstrap';
import { connect } from 'react-redux';

class MessageComponent extends Component{
  constructor(props) {
    super(props)
    this.state = {
      message: []
    }; 
  }

  render() {
    return (
      <Col className="Row">
        <section id="timeline">
          {this.props.message.message && 
            this.props.message.message.filter( mess => mess.email ===  this.props.user )
              .map( mess => 
                  <article key={mess.message}>
                    <div className="inner">
                      <span className="date">
                        <span className="day">{ new Date(mess.date).getDate()}<sup>th</sup></span>
                        <span className="month">{new Date(mess.date).getMonth()}</span>
                        <span className="year">{new Date(mess.date).getFullYear()}</span>
                      </span>
                      <h2>{mess.email}</h2> 
                      <p>{mess.message}</p>
                    </div>
                  </article>
            )}
        </section>
      </Col> 
    )
  }
}

const mapStateToProps = (state) => {
  return {
    message : state.message
  };
};

export default connect(mapStateToProps, null)(MessageComponent);
      
  
      
    