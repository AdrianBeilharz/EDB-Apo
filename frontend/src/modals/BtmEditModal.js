import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Col, Button, Form, Row } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import { responsiveFontSizes } from '@material-ui/core';

function BtmEditModal(props) {

  const { apoId } = useParams();

  const darreichungsformen = {
    'Tbl': { einheiten: ['Stueck'] },
    'Trp': { einheiten: ['ml'] },
    'Sup': { einheiten: ['Stueck'] },
    'RTA': { einheiten: ['Stueck'] },
    'RKA': { einheiten: ['Stueck'] },
    'Ampullen': { einheiten: ['Stueck'] },
    'Rezeptursubstanz': { einheiten: ['mg', 'g'] },
    'HKP': { einheiten: ['Stueck'] },
    'Pfl': { einheiten: ['Stueck'] }
  };

  let { id, darreichungsform, einheit, name, menge } = props.btm;
  // console.log(props.btm)
  const [einheiten, setEinheiten] = useState(darreichungsformen[darreichungsform].einheiten);

  const { enqueueSnackbar } = useSnackbar();


  const updateDetails = async event => {
    event.preventDefault();
    let { name, darreichungsform, einheit, menge } = event.target;
    let body = {
      name: name.value,
      darreichungsform: darreichungsform.value,
      einheit: einheit.value,
      menge: menge.value
    }
    console.log(body)
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.status === 200) {
        hide();
        props.updateBtmData();
        enqueueSnackbar('Benutzer aktualisiert', { variant: 'success', autoHideDuration: 3000 });
      } else if (res.status === 400) {
        enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant: 'error', autoHideDuration: 3000 });
      } else if (responsiveFontSizes.status === 403) {
        enqueueSnackbar('Falsches Passwort', { variant: 'error', autoHideDuration: 3000 });
      }
    }).catch((err) => {
      console.log(err);
      return;
    });
  }

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setEinheiten(darreichungsformen[props.btm.darreichungsform].einheiten), [props.btm])

  const hide = () => {
    setEinheiten(darreichungsformen[props.btm.darreichungsform].einheiten)
    props.onHide();
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExiting={hide}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Betäubungsmittel bearbeiten
                 </Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateDetails}>
        <Modal.Body>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="2">
              Name
                        </Form.Label>
            <Col sm="10">
              <Form.Control defaultValue={name} name="name" required type="text" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="menge">
            <Form.Label column sm="2">
              Menge
                        </Form.Label>
            <Col sm="10">
              <Form.Control defaultValue={menge} name="menge" type="number" min="0" />
            </Col>
          </Form.Group>


          <Form.Group as={Row} controlId="darreichungsform">
            <Form.Label column sm="2">
              Darreichungsform
                        </Form.Label>
            <Col sm="10">
              <Form.Control defaultValue={darreichungsform} onChange={event => {
                setEinheiten(darreichungsformen[event.target.value].einheiten)
              }} name="darreichungsform" required as="select">
                {
                  darreichungsformen ? Object.keys(darreichungsformen).map(df => <option kef={df} value={df}>{df}</option>) : null
                }
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="einheit">
            <Form.Label column sm="2">
              Einheit
                        </Form.Label>
            <Col sm="10">
              <Form.Control defaultValue={einheit} name="einheit" required as="select">
                {
                  einheiten ? Object.keys(einheiten).map(e => <option key={einheiten[e]} value={einheiten[e]}>{einheiten[e]}</option>) : null
                }
              </Form.Control>
            </Col>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="submit">Bestätigen</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )


}

export default BtmEditModal;
