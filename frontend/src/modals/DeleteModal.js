import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import Warning from '@material-ui/icons/Warning'

function DeleteModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExiting={props.onHide}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.headertext}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row >
          <Col sm="9">
            <p style={{ fontSize: '20pt' }}>{props.maintext}</p>
            <small>{props.subtext}</small>
          </Col>
          <Col sm="3">
            <Warning color="error" fontSize="large" />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button autoFocus variant="secondary"  onClick={props.onHide}>Abbrechen</Button>
        <Button variant="danger" onClick={() => { props.onHide(); props.onSubmit() }}>Bestätigen</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal;
