import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useSnackbar } from "notistack";

export default function NeuesBtmModal(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [activeDarreichungsform, setActiveDarreichungsform] = useState("Tbl");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hideModal = () => {
    setShowError(false);
    props.onHide();
  };

  const createNewBtm = async (event) => {
    event.preventDefault();
    let { btmName, btmMenge, btmDarreichungsform, btmEinheit } = event.target;
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.apothekeId}/btm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
        body: JSON.stringify({
          name: btmName.value,
          menge: btmMenge.value,
          darreichungsform: btmDarreichungsform.value,
          einheit: btmEinheit.value,
        }),
      }
    ).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });

    if (response && response.status === 201) {
      const data = await response.json();
      console.log(data);
      hideModal();
      enqueueSnackbar("Betäubungsmittel erfolgreich angelegt", {
        variant: "success",
        autoHideDuration: 3000,
      });
      props.apothekeRefFunctions.updateBtmList();
    } else if (response && response.status === 400) {
      setErrorMessage("OHJE");
      setShowError(true);
    }
  };

  let darreichungsformen = {
    Tbl: { einheiten: ["Stueck"] },
    Trp: { einheiten: ["ml"] },
    Sup: { einheiten: ["Stueck"] },
    RTA: { einheiten: ["Stueck"] },
    RKA: { einheiten: ["Stueck"] },
    Ampullen: { einheiten: ["Stueck"] },
    Rezeptursubstanz: { einheiten: ["g"] },
    HKP: { einheiten: ["Stueck"] },
    Pfl: { einheiten: ["Stueck"] },
  };
  var units = darreichungsformen[activeDarreichungsform].einheiten;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExiting={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Betäubungsmittel hinzufügen
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={createNewBtm}>
        {showError ? <Alert variant="danger">{errorMessage}</Alert> : null}
        <Modal.Body>
          <Form.Group as={Row} controlId="btmName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control name="btmName" required type="text" />
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
                min="0"
                defaultValue="0"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="btmDarreichungsform">
            <Form.Label column sm="2">
              Darreichungsform
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(event) =>
                  setActiveDarreichungsform(event.target.value)
                }
                name="btmDarreichungsform"
                required
                as="select"
              >
                {Object.keys(darreichungsformen).map((df) => (
                  <option value={df}>{df}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="btmEinheit">
            <Form.Label column sm="2">
              Einheit
            </Form.Label>
            <Col sm="10">
              <Form.Control name="btmEinheit" required as="select">
                {activeDarreichungsform !== ""
                  ? Object.keys(units).map((e) => (
                      <option value={units[e]}>{units[e]}</option>
                    ))
                  : null}
              </Form.Control>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Bestätigen
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
