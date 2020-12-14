import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Col, Button, Form } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

function UserDetailsUpdateModal(props) {

    const { apoId } = useParams();
    let { nutzername, name, vorname, id } = props.user;
    const [nutzernameVergeben, setNutzernameVergeben] = useState(false);

    //for password checking
    const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
    const [newPasswordVal, setNewPasswordVal] = useState('');
    const [passwordConfirmVal, setPasswordConfirmVal] = useState('');

    const { enqueueSnackbar } = useSnackbar();


    const updateDetails = async event => {
        event.preventDefault();
        let { username, vorname, nachname, neuesPasswort, altesPasswort } = event.target;
        let body = {
            name: nachname.value,
            nutzername: username.value,
            vorname: vorname.value,
            oldPassword: altesPasswort.value,
            aktiv: true
        }
        if(neuesPasswort.value){
            body.newPassword = neuesPasswort.value;
        } 
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            },
            body: JSON.stringify(body)
        }).catch((err) => {
            console.log(err);
            return;
        });

        if(response.status === 200) {
            const data = await response.json();
            props.onHide();
            props.setUser(data);
            let pw = neuesPasswort.value ? neuesPasswort.value: altesPasswort.value;
            if(props.loggedInUser.nutzername === nutzername) {
                //if the same user is logged in and changes its details a new token is needed
                getNewJwt(username.value, pw);
            }else {
                enqueueSnackbar('Benutzer Informationen aktualisiert', { variant:'success', autoHideDuration: 3000} );
            }
        }else if(response.status === 400) {
            enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant:'error', autoHideDuration: 3000} );
        }else if(response.status === 403) {
            enqueueSnackbar('Falsches Passwort', { variant:'error', autoHideDuration: 3000} );
        }
    }

    const getNewJwt = async (username, password) => {
        console.log(username, password)
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });

        if(response && response.status === 200){
            const data = await response.json();
            window.sessionStorage.setItem("edbapo-jwt", data.jwt)
            enqueueSnackbar('Benutzer Informationen aktualisiert', { variant:'success', autoHideDuration: 3000} );
        }else {
            enqueueSnackbar('Ein Fehler ist aufgetaucht', { variant:'error', autoHideDuration: 3000} );
        }
    }


    const checkIfUserNameIsTaken = async event => {
        let newUsername = event.target.value;
        if (newUsername.length < 4) {
            //if shorter than 4 its invalid
            setNutzernameVergeben(true);
            return;
        }

        if (newUsername !== nutzername && newUsername) {
            const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer/${newUsername}/checkUsername`, {
                method: 'POST',
            }).catch((err) => {
                console.log(err);
                return;
            });

            if (response.status === 200) {
                setNutzernameVergeben(false);
            } else if (response.status === 400) {
                setNutzernameVergeben(true);
            }
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Benutzer Einstellungen
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
                            <Form.Control onChange={event => setNewPasswordVal(event.target.value)} name="neuesPasswort" type="password" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="neuesPasswortConfirm">
                            <Form.Label>Neues Passwort bestätigen</Form.Label>
                            <Form.Control onChange={event => setPasswordConfirmVal(event.target.value)} isInvalid={passwordConfirmInvalid} name="neuesPasswortConfirm" type="password" />
                        </Form.Group>
                    </Form.Row>

                    <hr />
                    <Form.Row>
                        <Form.Group as={Col} controlId="altesPasswort">
                            <Form.Label>Passwort eingeben</Form.Label>
                            <Form.Control name="altesPasswort" required type="password" />
                        </Form.Group>
                    </Form.Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button autofocus variant="" onClick={props.onHide}>Abbrechen</Button>
                    <Button variant="primary" type="submit" >Bestätigen</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UserDetailsUpdateModal;