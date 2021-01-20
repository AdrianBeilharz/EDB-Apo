import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import { useSnackbar } from "notistack";

function NeueBuchungModal(props) {
  const moment = require("moment");
  const { enqueueSnackbar } = useSnackbar();
  const [typ, setTyp] = useState("");
  let { lieferanten, aerzte, empfaenger } = props;

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [disabled, setDisabled] = useState(true);
  const [maxMenge, setMaxMenge] = useState(props.btm.btm.menge);

  const handleDiasabledSubBt = () => {
    let today = new Date();
    if (date <= moment(today).format("YYYY-MM-DD")) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const sendNewBuchungAnfrage = async (buchungData) => {
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.apothekeId}/btmbuchung`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
        body: JSON.stringify(buchungData),
      }
    ).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });

    if (response && response.status === 201) {
      //const data = await response.json();
      // console.log(data);
      hideModal();
      enqueueSnackbar("Buchung erfolgreich angelegt", {
        variant: "success",
        autoHideDuration: 3000,
      });
      props.apothekeRefFunctions.updateBtmList();
    } else {
      //SHOW ERROR
      console.log(response);
    }
  };

  const createNewBuchung = (event) => {
    event.preventDefault();
    if (typ.toLowerCase() === "zugang") {
      let { anforderungsschein, btmMenge, lieferant, datum } = event.target;
      let buchungData = {
        benutzer: props.user.id,
        btm: props.btm.btm.id,
        menge: btmMenge.value,
        typ: "ZUGANG",
        lieferant: lieferant.value,
        anforderungsschein: anforderungsschein.value,
        datum: datum.value,
        pruefdatum: "",
      };
      sendNewBuchungAnfrage(buchungData);
    } else if (typ.toLowerCase() === "abgang") {
      let { btmMenge, rezept, empfaenger, arzt, datum } = event.target;
      let buchungData = {
        benutzer: props.user.id,
        btm: props.btm.btm.id,
        menge: btmMenge.value,
        typ: "ABGANG",
        empfaenger: empfaenger.value,
        arzt: arzt.value,
        rezept: rezept.value,
        pruefdatum: "",
        datum: datum.value,
      };
      sendNewBuchungAnfrage(buchungData);
    }
  };

  const hideModal = () => {
    setTyp("");
    setDate(moment(new Date()).format("YYYY-MM-DD"));
    props.onHide();
  };

  useEffect(() => {
    setMaxMenge(props.btm.btm.menge);
  }, [props.btm.btm.menge]);
  useEffect(() => {
    setDisabled(disabled);
  }, [disabled]);
  useEffect(() => setDate(moment(date).format("YYYY-MM-DD")), [moment, date]);
  useEffect(() => handleDiasabledSubBt());

  const renderZugang = () => {
    return (
      <React.Fragment>
        <Form.Group as={Row} controlId="anforderungsschein">
          <Form.Label column sm="2">
            Lieferschein
          </Form.Label>
          <Col sm="10">
            <Form.Control name="anforderungsschein" type="text" required />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="lieferant">
          <Form.Label column sm="2">
            Lieferant
          </Form.Label>
          <Col sm="10">
            <Form.Control name="lieferant" required as="select">
              {lieferanten.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </React.Fragment>
    );
  };

  const renderAbgang = () => {
    return (
      <React.Fragment>
        <Form.Group as={Row} controlId="empfaenger">
          <Form.Label column sm="2">
            Empfaenger
          </Form.Label>
          <Col sm="10">
            <Form.Control name="empfaenger" required as="select">
              {empfaenger.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="arzt">
          <Form.Label column sm="2">
            Arzt
          </Form.Label>
          <Col sm="10">
            <Form.Control name="arzt" required as="select">
              {aerzte.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="rezept">
          <Form.Label column sm="2">
            Rezept
          </Form.Label>
          <Col sm="10">
            <Form.Control name="rezept" type="text" required />
          </Col>
        </Form.Group>
      </React.Fragment>
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExiting={hideModal}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buchung für{" "}
          <span style={{ fontWeight: "bold" }}>{props.btm.btm.name} </span>{" "}
          hinzufügen
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={createNewBuchung}>
        <Modal.Body>
          <Form.Group as={Row} controlId="Typ">
            <Col sm={{ span: 10, offset: 2 }}>
              <Row sm={6}>
                <Form.Check
                  required
                  type="radio"
                  label="Zugang"
                  name="TypRadio"
                  id="ZugangRadio"
                  onClick={() => {
                    setTyp("zugang");
                    setMaxMenge(9999);
                  }}
                />
                <Form.Check
                  required
                  type="radio"
                  label="Abgang"
                  name="TypRadio"
                  id="AbgangRadio"
                  onClick={() => {
                    setTyp("abgang");
                    setMaxMenge(props.btm.btm.menge);
                  }}
                />
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="btmMenge">
            <Form.Label column sm="2">
              Menge
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="btmMenge"
                type="number"
                min="1"
                max={maxMenge}
                defaultValue="0"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="datum">
            <Form.Label column sm="2">
              Datum
            </Form.Label>
            <Col sm="10">
            <OverlayTrigger
								placement="right"
								show={disabled}
								overlay={<Tooltip id="button-tooltip-1">Das Datum darf nicht in der Zukunft liegen</Tooltip>}
							>
              <Form.Control
                name="datum"
                type="date"
                required="required"
                value={date}
                default={date}
                onChange={(e) => {
                  setDate(moment(e.target.value).format("YYYY-MM-DD"));
                  handleDiasabledSubBt();
                }}
                isInvalid={disabled}
              />
              </OverlayTrigger>
            </Col>
          </Form.Group>

          {typ.toLowerCase() === "zugang" ? renderZugang() : null}
          {typ.toLowerCase() === "abgang" ? renderAbgang() : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hideModal}>
            Abbrechen
          </Button>
          <Button variant="primary" disabled={disabled} type="submit">
            Bestätigen
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NeueBuchungModal;
