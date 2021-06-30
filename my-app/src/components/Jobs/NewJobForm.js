import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class NewJobForm extends React.Component {
  state = {
    
    designation: "",
    location: "",
    job_description: "",
    job_type: "",
    registrationDate:"",
    salary: "",
    is_published:true
  };

  componentDidMount() {
    if (this.props.job) {
      const { id, designation, location, job_description, job_type,registrationDate ,salary,is_published} = this.props.job;
      this.setState({ id, designation, location, job_description, job_type,registrationDate ,salary,is_published});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createJob = e => {
    e.preventDefault();
    axios.post(`/api/jobs/`, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editJob = e => {
    e.preventDefault();
    axios.put(`/api/jobs/` + this.state.id +`/`, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.job ? this.editJob : this.createJob}>
        <FormGroup>
          <Label for="designation">Designation:</Label>
          <Input
            type="text"
            name="designation"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.designation)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location:</Label>
          <Input
            type="text"
            name="location"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.location)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="job_description">Description:</Label>
          <Input
            type="text"
            name="job_description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.job_description)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="job_type">Type of Job:</Label>
          <Input
            type="text"
            name="job_type"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.job_type)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="salary">Salary:</Label>
          <Input
            type="salary"
            name="salary"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.salary)}
          />
        </FormGroup>
        <Button variant="outline-primary">Send</Button>
      </Form>
    );
  }
}

export default NewJobForm;