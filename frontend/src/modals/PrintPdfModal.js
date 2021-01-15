import React, { useState, useEffect } from "react";
import { Modal, Col, Button, Form, Row } from "react-bootstrap";
import { Checkbox } from "@material-ui/core";

function PrintPdfModal(props) {
  const [disabled, setDisabled] = useState(true);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);


  const handleFilter = () => {
    if ((startDate && endDate) || props.checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const toggle = () => {
    setDisabled(false);
  };

  useEffect(() => {
    handleFilter();
  }, [props.checked, startDate, endDate, disabled]);

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
                onChange={(event) => {
                  props.start(event.target.value);
                  setStartDate(true);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm="2">
              Bis:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="endDate"
                type="date"
                defaultValue={new Date()}
                onChange={(event) => {
                  props.ende(event.target.value);
                  setEndDate(true);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="aktiv" style={{ display: "inline" }}>
            <Row>
            <Form.Label column sm="9">
              Gesamte Buchungsliste  {props.checked.value}
            </Form.Label>
            <Col sm="2">
              <Checkbox
                type="checkbox"
                checked={props.checked}
                name="aktiv"
                onChange={(event) => {
                props.unFilter(event.target.checked);
                toggle();
                }}
              />
            </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Abbrechen
          </Button>
          <Button
            variant="primary"
            disabled={disabled}
            onClick={() => {
              props.onHide();
              props.onSubmit();
              handleFilter();
            }}
          >
            Speichern
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PrintPdfModal;
