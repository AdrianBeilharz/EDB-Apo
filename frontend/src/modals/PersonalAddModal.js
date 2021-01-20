import React, { useState, useEffect } from 'react';
import { Modal, Col, Button, Form, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function PersonalAddModal(props) {

  const { apoId } = useParams();

  const [nutzernameVergeben, setNutzernameVergeben] = useState(false);

  //for password checking
  const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [passwordConfirmVal, setPasswordConfirmVal] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  let roles = ["ADMIN", "PRUEFER", "BENUTZER"];

  const createNewUser = async event => {
    event.preventDefault();
    let { username, vorname, nachname, neuesPasswort, rolle } = event.target;

    let body = {
      name: nachname.value,
      nutzername: username.value,
      vorname: vorname.value,
      aktiv: true,
      rolle: rolle.value,
      passwort: neuesPasswort.value
    }

    console.log(body)
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.status === 201) {
        props.onHide();
        props.updateUserList();
        enqueueSnackbar('Benutzer erstellt', { variant: 'success', autoHideDuration: 3000 });
      } else if (res.status === 400) {
        enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant: 'error', autoHideDuration: 3000 });
      }
    }).catch((err) => {
      console.log(err);
      return;
    });
  }

  const checkIfUserNameIsTaken = async event => {
    let newUsername = event.target.value;
    if (newUsername.length < 4) {
      //if shorter than 4 its invalid
      setNutzernameVergeben(true);
      return;
    }

    await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/${newUsername}/checkUsername`, {
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        setNutzernameVergeben(false);
      } else if (res.status === 400) {
        setNutzernameVergeben(true);
      }
    }).catch((err) => {
      console.log(err);
      return;
    });
  }

  useEffect(() => {
    setPasswordConfirmInvalid(newPasswordVal !== passwordConfirmVal);
  }, [newPasswordVal, passwordConfirmVal]);


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
          Personal hinzufügen
            </Modal.Title>
      </Modal.Header>
      <Form onSubmit={createNewUser}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="username">
              <Form.Label>Benutzername</Form.Label>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                show={nutzernameVergeben}
                overlay={props => <Tooltip id="button-tooltip" {...props}>Nutzername bereits vergeben oder zu kurz</Tooltip>}
              >
              <Form.Control name="username" required onChange={checkIfUserNameIsTaken}
                isInvalid={nutzernameVergeben} type="text" />
              </OverlayTrigger>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={4} controlId="vorname">
              <Form.Label>Vorname</Form.Label>
              <Form.Control name="vorname" required type="text" />
            </Form.Group>

            <Form.Group as={Col} sm={8} controlId="nachname">
              <Form.Label>Nachname</Form.Label>
              <Form.Control name="nachname" required type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="neuesPasswort">
              <Form.Label>Neues Passwort</Form.Label>
              <Form.Control required minlength={5} onChange={event => setNewPasswordVal(event.target.value)} name="neuesPasswort" type="password" />
            </Form.Group>
            <Form.Group as={Col} controlId="neuesPasswortConfirm">
              <Form.Label>Neues Passwort bestätigen</Form.Label>
              <Form.Control required minlength={5} onChange={event => setPasswordConfirmVal(event.target.value)} isInvalid={passwordConfirmInvalid} name="neuesPasswortConfirm" type="password" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm={4} controlId="rolle">
              <Form.Label>Rolle</Form.Label>
              <Form.Control required name="rolle" as="select" >
                {roles.map(r => <option key={r} value={r}>{r}</option>)}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Modal.Body>
        <Modal.Footer>
          <Button autofocus variant="danger"  onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="submit" >Bestätigen</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default PersonalAddModal;
