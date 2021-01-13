import React from "react";
import { Modal, Col, Button, Form, Row } from "react-bootstrap";

function PrintPdfModal(props) {

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Zeitraum für Buchungen wählen
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm="2">
              Von:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="startDate"
                type="date"
                defaultValue={new Date()}
                onChange={(event) => props.start(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm="2">
              Von:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="endDate"
                type="date"
                defaultValue={new Date()}
                onChange={(event) => props.ende(event.target.value)}
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Abbrechen
          </Button>
          <Button variant="primary" onClick={() => { props.onHide(); props.onSubmit()}}>
            Speichern
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PrintPdfModal;
