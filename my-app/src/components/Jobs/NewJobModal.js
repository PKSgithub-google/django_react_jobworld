import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewJobForm from "./NewJobForm";
import { FaEdit } from 'react-icons/fa'

class NewJobModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Job";
    var button = <FaEdit
    onClick={() => this.toggle()} /> ;
    if (create) {
      title = "Creating New Job";

      button = (
        <Button variant="outline-secondary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Add New Job
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewJobForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              job={this.props.job}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewJobModal;
