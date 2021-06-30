import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";


class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword:'',
    successMessage: null
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

   handleSubmitClick = (e) => {
    e.preventDefault();
    if(this.state.password === this.state.confirmPassword) {

        this.props.handle_signup(e, this.state,this.props.history) 
        alert("All good");  
    } else {
        alert('Passwords do not match');
    }
} 
  

 redirectToHome = () => {
    this.props.history.push('/home');
}
 redirectToLogin = () => {
    this.props.history.push('/login'); 
}

render(){
return(
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <br></br> <br></br>
        <p>Please register yourself today! </p>
        <form onSubmit={this.handleSubmitClick}>
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
            <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input type="password" 
                    className="form-control" 
                    name="confirmPassword" 
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={this.handle_Change} 
                />
            </div>
            <input type="submit" className="btn btn-primary"/>
            
        </form>
        <div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
            {this.state.successMessage}
        </div>
        <div className="mt-2">
            <span>Already have an account? </span>
            <span className="loginText" onClick={() => this.redirectToLogin()}>Login here</span> 
        </div>
        
    </div>
  );
 }
}
export default withRouter(SignupForm);

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
  };