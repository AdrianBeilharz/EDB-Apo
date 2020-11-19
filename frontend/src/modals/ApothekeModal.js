import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ApothekeModal(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">OK</Button>
      </Modal.Footer>
    </Modal>
  )
  
}

export default ApothekeModal;
