import React, { Component } from "react";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Navigation, Footer, Home, About ,LoginForm, SignupForm, Search, AllJobs} from "./components";
import Logout from "./components/Authentication/Logout";
import "./App.css";
import UserProfileForm from "./components/Accounts/UserProfileForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      email: '',
      errorMessage:''
      
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ email: json.email });
        });
    }
  }

  handle_login = (e, data,history) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
          localStorage.setItem('token', json.token);
          this.setState({
            email: json.user.email,
            logged_in: true,
            displayed_form: '',
            'successMessage' : 'Login successful. Redirecting to home page..'
        });
     
      }).catch(console.error);
      history.push('/home');
    
  };

  handle_signup = (e, data,history) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            email: json.email,
            successMessage : 'Registration successful. Redirecting to home page..'
          });
       
        }).catch(console.error);
        history.push('/home');
  };

  
  handle_logout = (history) => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, email: '' });
    
    history.push('/home');
  };

  
  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };



  render(){
    return (
      
        
        <Router>
           <div className="App">
            <Header logged_in={this.state.logged_in} 
            email={this.state.email}/>
              
        
            <Navigation />
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route path="/search" exact component={() => <Search />} />
              <Route path="/alljobs" exact component={() => <AllJobs />} />
              <Route path="/account"> 
                <UserProfileForm logged_in={this.state.logged_in} 
            email={this.state.email} />
              </Route>
            </Switch>
            <div className="container d-flex align-items-center flex-column">
                <Switch>
                  <Route path="/signup">
                    <SignupForm showError={this.state.errorMessage}  handle_signup={this.handle_signup} />
                  </Route>
                  
                  <Route path="/login">
                      <LoginForm showError={this.state.errorMessage} handle_login={this.handle_login} />
                      
                  </Route>
                  <Route path="/home">
                    <Home />
                  </Route>
                  <Route path="/logout"> 
                  <Logout handle_logout={this.handle_logout}/>
                  </Route>
                    
               </Switch>
               
              </div>
          
          
            <Footer />
          </div>
        </Router>
     
      
       
        
        
      
    );
   }
}

export default App;