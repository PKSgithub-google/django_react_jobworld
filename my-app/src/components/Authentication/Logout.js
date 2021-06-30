import React from 'react';
import './Login.css';
import { withRouter } from "react-router-dom";
import Home from "../Home";

class Logout extends React.Component {
    state = {
      username: '',
      password: '',
      successMessage:null
    };

  
     
  
    render() {
      return(
          
              <div onLoad= {() => this.props.handle_logout(this.props.history)}>
                  <Home />
              </div>
        
      )
    }
  }
  
  export default withRouter(Logout);