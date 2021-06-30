import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Pagination from '../Pagination';
import NewJobModal from "./NewJobModal";
import JobList from "../JobList";
import "./Jobs.css";
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class AllJobs extends Component {
  state = {
    jobs: [],
    currentJobs: [], currentPage: null, totalPages: null 
  };

  componentDidMount() {
    this.resetState();

 }
 
  getJobs = () => {
   axios.get(`/api/jobs/`).then(res => this.setState({ jobs: res.data }));
    }
  resetState = () => {
    this.getJobs();
  }

  onPageChanged = data => {
    const { jobs } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentJobs = jobs.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentJobs, totalPages });
  }



  render() {
    const { jobs, currentJobs, currentPage, totalPages } = this.state;
    const totaljobs = jobs.length;

    if (totaljobs === 0) return null;

    return (
      <div className="container mb-5">
        
        <div className="d-flex flex-row py-4 align-items-right"> 
        <Pagination totalRecords={totaljobs} pageLimit={3} pageNeighbours={1} onPageChanged={this.onPageChanged} />
        </div>
      
    
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <JobList
              jobs={currentJobs}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewJobModal create={true} resetState={this.resetState} />
          </Col>
        </Row>
      </Container>
      
      </div>
    );

  }
}

export default AllJobs;
