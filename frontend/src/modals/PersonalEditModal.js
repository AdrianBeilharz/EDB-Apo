import React, { useState, useEffect } from 'react';
import { Modal, Col, Button, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HelpIcon from '@material-ui/icons/Help';
import { Checkbox } from '@material-ui/core';
import { useSnackbar } from 'notistack';

function PersonalUpdateModal(props) {

  const { apoId } = useParams();

  let { id, nutzername, name, vorname, aktiv, rolle } = props.user;
  const [nutzernameVergeben, setNutzernameVergeben] = useState(false);

  //for password checking
  const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [passwordConfirmVal, setPasswordConfirmVal] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  let roles = ["ADMIN", "PRUEFER", "BENUTZER"];


  const updateDetails = async event => {
    event.preventDefault();
    let { username, vorname, nachname, neuesPasswort, rolle, aktiv } = event.target;

    let body = {
      name: nachname.value,
      nutzername: username.value,
      vorname: vorname.value,
      aktiv: aktiv.checked,
      rolle: rolle.value
    }
    if (neuesPasswort.value) {
      body.newPassword = neuesPasswort.value;
    }
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.status === 200) {
        props.onHide();
        props.updateUserList();
        enqueueSnackbar('Benutzer aktualisiert', { variant: 'success', autoHideDuration: 3000 });
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

  const checkIfUserNameIsTaken = async event => {
    let newUsername = event.target.value;
    if (newUsername.length < 4) {
      //if shorter than 4 its invalid
      setNutzernameVergeben(true);
      return;
    }

    if (newUsername !== nutzername && newUsername) {
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

    } else {
      setNutzernameVergeben(false);
    }
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
          Personal bearbeiten
            </Modal.Title>
      </Modal.Header>
      <Form onSubmit={updateDetails}>
        <Modal.Body>
          <Form.Row>
            <Form.Group as={Col} controlId="username">
              <Form.Label>Benutzername</Form.Label>
              <Form.Control name="username" required onChange={checkIfUserNameIsTaken}
                isInvalid={nutzernameVergeben} defaultValue={nutzername} type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm={4} controlId="vorname">
              <Form.Label>Vorname</Form.Label>
              <Form.Control name="vorname" required defaultValue={vorname} type="text" />
            </Form.Group>

            <Form.Group as={Col} sm={8} controlId="nachname">
              <Form.Label>Nachname</Form.Label>
              <Form.Control name="nachname" required defaultValue={name} type="text" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="neuesPasswort">
              <Form.Label>Neues Passwort</Form.Label>
              <Form.Control minlength={5} onChange={event => setNewPasswordVal(event.target.value)} name="neuesPasswort" type="password" />
            </Form.Group>
            <Form.Group as={Col} controlId="neuesPasswortConfirm">
              <Form.Label>Neues Passwort bestätigen</Form.Label>
              <Form.Control minlength={5} onChange={event => setPasswordConfirmVal(event.target.value)} c={passwordConfirmInvalid} name="neuesPasswortConfirm" type="password" />
            </Form.Group>
          </Form.Row>
          <Form.Group style={{ marginLeft: '1em' }} controlId="aktiv">
            <Row style={{ alignItems: 'center' }} >
              <Form.Label>Aktiv</Form.Label>
              <Checkbox defaultChecked={aktiv} type="checkbox" name="aktiv" />
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={props => <Tooltip id="button-tooltip" {...props}>Ein inaktiver Benutzer ist gesperrt und kann sich nicht einloggen</Tooltip>}
              >
                <HelpIcon style={{ marginLeft: '0.3em' }} />
              </OverlayTrigger>


              <Form.Group style={{ marginLeft: '3.5em' }} as={Col} sm={4} controlId="rolle">
                <Form.Label>Rolle</Form.Label>
                <Form.Control name="rolle" required as="select" defaultValue={rolle}>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </Form.Control>
              </Form.Group>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button autofocus variant="danger" onClick={props.onHide}>Abbrechen</Button>
          <Button variant="primary" type="submit" >Bestätigen</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default PersonalUpdateModal;
