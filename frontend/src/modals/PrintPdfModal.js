import React, { useState, useEffect } from "react";
import {
  Modal,
  Col,
  Button,
  Form,
  Row,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Checkbox } from "@material-ui/core";

function PrintPdfModal(props) {
  const moment = require("moment");
  const [disabled, setDisabled] = useState(true);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'y').format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const isStartEndValid = () => {
    if (startDate === "" || endDate === "") return false;
    return (
      startDate <= moment(new Date()).format("YYYY-MM-DD") &&
      endDate <= moment(new Date()).format("YYYY-MM-DD")
    );
  };

  const isStartValid = () => {
    if (startDate === "") return false;
    return startDate <= moment(new Date()).format("YYYY-MM-DD");
  };

  const isEndValid = () => {
    if (endDate === "" || startDate > endDate) return false;
    return endDate <= moment(new Date()).format("YYYY-MM-DD");
  };

  const handleFilter = () => {
    if (props.checked || isStartEndValid()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const reset = () => {
    setStartDate(moment().subtract(1, 'y').format('YYYY-MM-DD'))
    setEndDate(moment().format('YYYY-MM-DD'))
  }

  
  useEffect(isStartEndValid, [endDate, moment, startDate]);
  useEffect(isEndValid, [endDate, moment, startDate]);
  useEffect(isStartValid, [endDate, moment, startDate]);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleFilter, [props.checked]);
  

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
      backdrop="static"
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
              <OverlayTrigger
                placement="right"
                show={startDate > moment(new Date()).format("YYYY-MM-DD")}
                overlay={
                  <Tooltip id="button-tooltip-1">
                    Das Datum darf nicht in der Zukunft liegen
                  </Tooltip>
                }
              >
                <Form.Control
                  name="startDate"
                  type="date"
                  value={startDate}
                  defaultValue={startDate}
                  onChange={(event) => {
                    props.start(event.target.value);
                    setStartDate(event.target.value);
                  }}
                  isInvalid={props.checked ? "" : !isStartValid()}
                />
              </OverlayTrigger>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm="2">
              Bis:
            </Form.Label>
            <Col sm="10">
              <OverlayTrigger
                placement="right"
                show={endDate > moment(new Date()).format("YYYY-MM-DD")}
                overlay={
                  <Tooltip id="button-tooltip-1">
                    Das Datum darf nicht in der Zukunft liegen
                  </Tooltip>
                }
              >
                <Form.Control
                  name="endDate"
                  type="date"
                  value={endDate}
                  defaultValue={endDate}
                  onChange={(event) => {
                    props.ende(event.target.value);
                    setEndDate(event.target.value);
                  }}
                  isInvalid={props.checked ? "" : !isEndValid()}
                />
              </OverlayTrigger>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="aktiv" style={{ display: "inline" }}>
            <Row>
              <Form.Label column sm="9">
                Gesamte Buchungsliste {props.checked.value}
              </Form.Label>
              <Col sm="2">
                <Checkbox
                  type="checkbox"
                  checked={props.checked}
                  name="aktiv"
                  onChange={(event) => {
                    props.unFilter(event.target.checked);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {reset(); props.onHide();}}>
            Abbrechen
          </Button>
          <Button
            variant="primary"
            disabled={disabled}
            onClick={() => {
              reset()
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
