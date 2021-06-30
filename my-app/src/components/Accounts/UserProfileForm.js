import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import './Profile.css'; 
import axios from "axios";
import { string } from "prop-types";
import Countries from 'countries-api';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class UserProfileForm extends React.Component {
  state = {
    jobseekerList:[],
    jobseeker:null,
    id:"",
    fname:"",
    mname:"",
    lname:"",
    gender:"",
    address:"",
    country:"India",
    email:"",
    mobile:"",
    experience:"1",
    Count: '' ,
    //allCountriesList:'',
    allCountries:[],
    selectedCountry: '',
    countries:[]

  };

  async componentDidMount() {
    const { data: allCountriesList = [] } = Countries.findAll();
    //this.setState({ allCountriesList });
    //alert("allCountries "+allCountriesList.length);
    const { data: jobseekerList }  = await axios.get(`/api/jobseekers/`),
    Count=jobseekerList.filter((item) => item.email === this.props.email).map(obj => this.setState({ jobseeker: obj}));
    
    this.setState({ jobseekerList ,Count});
   
    if (this.state.jobseeker) {

      const {id,fname, mname, lname, gender, address,email,country,mobile,experience} = this.state.jobseeker;
      this.setState({id,fname, mname, lname, gender, address,email,country,mobile,experience});
      if(this.state.country != 'No_Country'){
        this.setState({selectedCountry: this.state.country})
      }else {
        this.setState({selectedCountry: e.target.value})
       }
      
    }else{
        console.log("User does not exist!");
    }

    
      let countriesFromApi = allCountriesList.map(countryObj => {
        return {value: countryObj.name.common, display: countryObj.name.common}
      });
      this.setState({
        countries: [{value: '', display: '--Select Country--'}].concat(countriesFromApi)
      });
    

}
 

getJobseekers = () => {
  
  axios.get(`/api/jobs/`).then(res => this.setState({ jobseekerList: res.data }));
  

};

resetState = () => {
  this.getJobseekers();
};

  onChangeCountry = e =>{
    if(this.state.country != 'No_Country'){
      this.setState({selectedCountry: this.state.country})
    }else {
     this.setState({selectedCountry: e.target.value})
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createJobSeeker = e => {
    e.preventDefault();
    axios.post(`/api/jobseekers/`, this.state).then(() => {
      alert("Create");
      this.resetState();
      //this.props.toggle();
    });
  };

  editJobSeeker = e => {
    e.preventDefault();
    alert("get started");
    this.state.country = this.state.selectedCountry;
    axios.put(`/api/jobseekers/` + this.state.jobseeker.id +`/`, this.state).then(() => {
      alert("edit");
      this.resetState();
      
    });
  };


  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
      
      <Form onSubmit={this.state.jobseeker ? this.editJobSeeker : this.createJobSeeker}>
      <div className="form-group text-left">
        <FormGroup>
          <Label htmlFor="fname">First Name:</Label>
          <Input
            type="text"
            name="fname"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.fname)}
          />
        </FormGroup>
      </div>
        <FormGroup>
        <div className="form-group text-left">
          <Label htmlFor="mname">Middle Name:</Label>
          <Input
            type="text"
            name="mname"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.mname)}
          />
          </div>
       </FormGroup>
       <FormGroup>
       <div className="form-group text-left">
          <Label for="lname">Last Name:</Label>
          <Input
            type="text"
            name="lname"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.lname)}
          />
          </div>
        </FormGroup>
        <FormGroup>
        <div className="form-group text-left">
          <Label for="gender">Gender:</Label>
          <Input
            type="text"
            name="gender"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.gender)}
          />
          </div>
        </FormGroup>
        <FormGroup>
        <div className="form-group text-left">
          <Label for="address">Address:</Label>
          <Input
            type="text"
            name="address"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.address)}
          />
          </div>
         </FormGroup>
         <FormGroup>
          <div className="form-group text-left">
            <Label for="country">Countries:</Label>
            <select value={this.state.selectedCountry} className="form-control"
              onChange={this.onChangeCountry}>
              {this.state.countries.map((country) => <option key={country.value} value={country.value}>{country.display}</option>)}
            </select>
           
            </div>
         </FormGroup>
         <FormGroup>
         <div className="form-group text-left">
          <Label for="experience">Experience:</Label>
          <Input
            type="text"
            name="experience"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.experience)}
          />
          </div>
       </FormGroup>
       <FormGroup>
       <div className="form-group text-left">
          <Label for="mobile">Mobile:</Label>
          <Input
            type="text"
            name="mobile"
            className="form-control"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.mobile)}
          />
          </div>
          </FormGroup>
        <Button variant="outline-primary">Save</Button>
      </Form>
     </div>
     
    );
  }
}

export default UserProfileForm;