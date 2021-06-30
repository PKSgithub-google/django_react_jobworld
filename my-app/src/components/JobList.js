import React from "react";
import { Table } from "reactstrap";
import NewJobModal from "./Jobs/NewJobModal";
import ConfirmRemovalModal from "./Jobs/ConfirmRemovalModal";

const JobList = ({ jobs,resetState }) => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Designation</th>
            <th>Location</th>
            <th>Description</th>
            <th>Type</th>
            <th>Salary</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!jobs || jobs.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Oops, no one here yet</b>
              </td>
            </tr>
          ) : (
            jobs.map(job => (
              <tr key={job.id}>
                <td>{job.designation}</td>
                <td>{job.location}</td>
                <td>{job.job_description}</td>
                <td>{job.job_type}</td>
                <td>{job.salary}</td>
                <td align="center">
                  <NewJobModal
                    create={false}
                    job={job}
                    resetState={resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={job.id}
                    resetState={resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  
}

export default JobList;
