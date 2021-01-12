import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Col, Button, Form } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

function EmpfaengerUpdateModal(props) {

  const { apoId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  let { id, name, vorname, anschrift } = props.empfaenger;

  const updateDetails = async event => {
    event.preventDefault();
    let { name, vorname, plz, ort, strasse, nummer } = event.target;

    let body = {
      name: name.value,
      vorname: vorname.value,
      apotheke: apoId,
      anschrift: {
        ort: ort.value,
        plz: plz.value,
        strasse: strasse.value,
        nummer: nummer.value
      }
    }

    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/empfaenger/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.status === 200) {
        props.onHide();
        props.updateEmpfaengerData();
        enqueueSnackbar('Empfaenger aktualisiert', { variant: 'success', autoHideDuration: 3000 });
      } else if (res.status === 400) {
        enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant: 'error', autoHideDuration: 3000 });
      } else if (res.status === 403) {
        enqueueSnackbar('Falsches Passwort', { variant: 'error', autoHideDuration: 3000 });
      }
    }).catch((err) => {
      console.log(err);
      return;
    });
  }

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
          Empfaenger bearbeiten
            </Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateDetails}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required defaultValue={name} type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="vorname">
              <Form.Label>Vorname</Form.Label>
              <Form.Control name="vorname" required defaultValue={vorname} type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={9} controlId="strasse">
              <Form.Label>Straße</Form.Label>
              <Form.Control name="strasse" required type="text" defaultValue={anschrift.strasse} />
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="nummer">
              <Form.Label>Nummer</Form.Label>
              <Form.Control name="nummer" required type="text" defaultValue={anschrift.nummer} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={3} controlId="plz">
              <Form.Label>PLZ</Form.Label>
              <Form.Control name="plz" required type="text" defaultValue={anschrift.plz} />
            </Form.Group>

            <Form.Group as={Col} sm={9} controlId="ort">
              <Form.Label>Ort</Form.Label>
              <Form.Control name="ort" required type="text" defaultValue={anschrift.ort} />
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button autofocus variant="danger" onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="submit" >Bestätigen</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EmpfaengerUpdateModal;
