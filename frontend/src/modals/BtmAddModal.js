import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

function BtmAddModal(props) {

  const { apoId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [activeDarreichungsform, setActiveDarreichungsform] = useState('Tbl');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const createNewBtm = async event => {
    event.preventDefault();
    let { btmName, btmMenge, btmDarreichungsform, btmEinheit } = event.target;

    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
      body: JSON.stringify({
        name: btmName.value,
        menge: btmMenge.value,
        darreichungsform: btmDarreichungsform.value,
        einheit: btmEinheit.value
      })
    }).then((res) => {
      if (res.status === 201) {
        props.onHide();
        props.updateBtmData();
        enqueueSnackbar('Betäubungsmittel erfolgreich angelegt', { variant: 'success', autoHideDuration: 3000 });
      } else if (res.status === 400) {
        setErrorMessage('Betäubungsmittel existiert bereits oder Daten ungültig');
        setShowError(true);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });

    

  }

  // let einheiten = ['g','mg','ml', 'Stueck']
  let darreichungsformen = {
    'Tbl': { einheiten: ['Stueck'] },
    'Trp': { einheiten: ['ml'] },
    'Sup': { einheiten: ['Stueck'] },
    'RTA': { einheiten: ['Stueck'] },
    'RKA': { einheiten: ['Stueck'] },
    'Ampullen': { einheiten: ['Stueck'] },
    'Rezeptursubstanz': { einheiten: ['mg', 'g'] },
    'HKP': { einheiten: ['Stueck'] },
    'Pfl': { einheiten: ['Stueck'] }
  }
  var units = darreichungsformen[activeDarreichungsform].einheiten;

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
              <Form.Control name="btmMenge" type="number" min="0" defaultValue="0" />
            </Col>
          </Form.Group>


          <Form.Group as={Row} controlId="btmDarreichungsform">
            <Form.Label column sm="2">
              Darreichungsform
                        </Form.Label>
            <Col sm="10">
              <Form.Control onChange={event => setActiveDarreichungsform(event.target.value)} name="btmDarreichungsform" required as="select">
                {Object.keys(darreichungsformen).map(df => <option kef={df} value={df}>{df}</option>)}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="btmEinheit">
            <Form.Label column sm="2">
              Einheit
                        </Form.Label>
            <Col sm="10">
              <Form.Control name="btmEinheit" required as="select">
                {activeDarreichungsform !== '' ? Object.keys(units).map(e => <option key={units[e]} value={units[e]}>{units[e]}</option>) : null}
              </Form.Control>
            </Col>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="submit">Bestätigen</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default BtmAddModal;
