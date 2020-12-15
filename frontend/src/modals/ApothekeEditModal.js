import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

function ApothekeEditModal(props) {
  const { apoId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const updateApothekeDetails = event => {
    event.preventDefault();
    let { name, email, strasse, nummer, plz, ort } = event.target;
    let body = {
      name: name.value,
      email: email.value,
      anschrift: {
        strasse: strasse.value,
        nummer: nummer.value,
        plz: plz.value,
        ort: ort.value
      }
    };
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt")
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.status === 200) {
        props.onHide();
        props.updateApothekeData();
        enqueueSnackbar('Apotheke aktualisiert', { variant: 'success', autoHideDuration: 3000 });
      } else if (res.status === 400) {
        enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant: 'error', autoHideDuration: 3000 });
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  return (
    <Modal show={props.show} onHide={props.onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Apotheke bearbeiten</Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateApothekeDetails}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="text" placeholder="Name der Apotheke" name="name" defaultValue={props.apotheke.name} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="email" placeholder="E-Mail der Apotheke" name="email" defaultValue={props.apotheke.email} />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Straße" name="strasse" defaultValue={props.apotheke.anschrift.strasse} />
            </Col>
            <Col>
              <Form.Control type="text" placeholder="Nummer" name="nummer" defaultValue={props.apotheke.anschrift.nummer} />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Control type="text" placeholder="PLZ" name="plz" defaultValue={props.apotheke.anschrift.plz} />
            </Col>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Ort" name="ort" defaultValue={props.apotheke.anschrift.ort} />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="Submit">Bearbeiten</Button>
        </Modal.Footer>
      </Form>
    </Modal >
  )


}

export default ApothekeEditModal;
