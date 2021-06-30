import React from 'react';
import JobList from "../JobList";

import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          jobList: [],
          searchTerm: ''
        };
      }
  
  componentDidMount() {
        this.refreshList();
      }
    
  refreshList = () => {
        axios
          .get(`/api/jobs/`)
          .then((res) => this.setState({ jobList: res.data }))
          .catch((err) => console.log(err));
      };
  
  handleSubmit = (item) => {
        this.toggle();
    
        if (item.designation) {
          axios
            .put(`/api/jobs/${item.id}/`, item)
            .then((res) => this.refreshList());
          return;
        }
        
      };
     
  editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  dynamicSearch = () => {
    if (this.state.searchTerm !== '') {
      return this.state.jobList.filter((item) => item.designation.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
    }
    // this.state.names.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }

  

    render(){
      return (
        <div className="App">
         <br></br><br></br>
          <p className="App-intro">Find your Dream Job</p>
          <form className="search">
            <input
              value={this.state.searchTerm}
              onChange={this.editSearchTerm}
              type="text" placeholder = 'Search for a job!'
            />
            <input onClick={this.handleSubmit}  type="submit" value="SEARCH" />
          </form>
         
          <br></br>
          
          <JobList
              jobs={this.dynamicSearch()}
              resetState={this.refreshList}
            />
          
         
        </div>
        
      );
    }
}

export default Search;