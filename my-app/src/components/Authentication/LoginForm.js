import React from 'react';
import './Login.css';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';


class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    successMessage:null
  };

  handle_Change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  
   redirectToHome = () => {
        
        this.props.history.push('/home');
    }

   redirectToRegister = () => {
        this.props.history.push('/signup'); 
        
    }

  render() {
    return(
      
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
          <br></br> <br></br>
          <p>Please log in </p>
            <form onSubmit={e => this.props.handle_login(e, this.state,this.props.history)}>
                <div className="form-group text-left">
                <label htmlFor="email">Email</label>
                <input type="email" 
                       className="form-control" 
                       name="email" 
                       placeholder="Enter Email" 
                       value={this.state.email}
                       onChange={this.handle_Change}
                />
                
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       name="password" 
                       placeholder="Password"
                       value={this.state.password}
                       onChange={this.handle_Change} 
                />
                </div>
                <div className="form-check">
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
                
            </form>
            <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
                {this.state.successMessage}
            </div>
            <div className="registerMessage">
                <span>New User?  </span>
                <span className="loginText" onClick={() => this.redirectToRegister()}>Register</span> 
            </div>
            
        </div>

       
    )
  }
}

export default withRouter(LoginForm);

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};