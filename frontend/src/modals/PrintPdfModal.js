import React, { useState, useEffect } from "react";
import {
  Modal,
  Col,
  Button,
  Form,
  Row,
} from "react-bootstrap";

function PrintPdfModal(props) {
  const saveDateForFilter = () => {
    console.log(test);
  };

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
      <Form onSubmit={saveDateForFilter}>
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
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Abbrechen
          </Button>
          <Button variant="primary" type="submit">
            Speichern
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PrintPdfModal;
