import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

function NeueBuchungModal(props) {
    
    const { enqueueSnackbar } = useSnackbar();
    const [typ, setTyp] = useState('');
    const [lieferanten, setLieferanten] = useState([]);
    const [aerzte, setAerzte] = useState([]);
    const [empfaenger, setEmpfaenger] = useState([]);

    const sendNewBuchungAnfrage = async (buchungData) => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.apothekeId}/btmbuchung`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            },
            body: JSON.stringify(buchungData)
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });


        if (response && response.status === 201) {
            const data = await response.json();
            // console.log(data);
            hideModal();
            enqueueSnackbar('Buchung erfolgreich angelegt', { variant:'success', autoHideDuration: 3000} );
            props.apothekeRefFunctions.updateBtmList();
        } else {
            //SHOW ERROR
            console.log(response);
        }
    }

    const createNewBuchung = event => {
        event.preventDefault();
        if (typ.toLowerCase() === 'zugang') {
            let { anforderungsschein, btmMenge, lieferant, pruefdatum } = event.target;
            let buchungData = {
                benutzer: props.user.id,
                btm: props.btm.btm.id,
                menge: btmMenge.value,
                typ: 'ZUGANG',
                lieferant: lieferant.value,
                anforderungsschein: anforderungsschein.value,
                pruefdatum: pruefdatum.value
            }
            sendNewBuchungAnfrage(buchungData);
        } else if (typ.toLowerCase() === 'abgang') {
            let { btmMenge, rezept, empfaenger, arzt, pruefdatum } = event.target;
            let buchungData = {
                benutzer: props.user.id,
                btm: props.btm.btm.id,
                menge: btmMenge.value,
                typ: 'ABGANG',
                empfaenger: empfaenger.value,
                arzt: arzt.value,
                rezept: rezept.value,
                pruefdatum: pruefdatum.value
            }
            sendNewBuchungAnfrage(buchungData);
        }
    }

    const hideModal = () => {
        setTyp('');
        props.onHide();
    }


    const loadLieferanten = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.apothekeId}/lieferant`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            }
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });

        if (response.status === 200) {
            setLieferanten(await response.json());
            console.log(lieferanten);
        } else if (response.status === 403) {
            // props.history.push('/forbidden');
        } else if (response.status === 400) {
            // props.history.push('/badrequest');
        }
    }

    const loadAerzte = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.apothekeId}/arzt`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            }
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });

        if (response.status === 200) {
            setAerzte(await response.json());
        } else if (response.status === 403) {
            // props.history.push('/forbidden');
        } else if (response.status === 400) {
            // props.history.push('/badrequest');
        }
    }

    const loadEmpfaenger = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.apothekeId}/empfaenger`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            }
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });

        if (response.status === 200) {
            setEmpfaenger(await response.json());
        } else if (response.status === 403) {
            // props.history.push('/forbidden');
        } else if (response.status === 400) {
            // props.history.push('/badrequest');
        }
    }

    useEffect(() => {
        loadLieferanten();
        loadAerzte();
        loadEmpfaenger();
    }, []);

    const renderZugang = () => {
        return (
            <React.Fragment>
                <Form.Group as={Row} controlId="anforderungsschein">
                    <Form.Label column sm="2">
                        Anforderungsschein
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
                            {lieferanten.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </React.Fragment>)
    }

    const renderAbgang = () => {
        return (
            <React.Fragment>
                <Form.Group as={Row} controlId="empfaenger">
                    <Form.Label column sm="2">
                        Empfaenger
                </Form.Label>
                    <Col sm="10">
                        <Form.Control name="empfaenger" required as="select">
                            {empfaenger.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="arzt">
                    <Form.Label column sm="2">
                        Arzt
                </Form.Label>
                    <Col sm="10">
                        <Form.Control name="arzt" required as="select">
                            {aerzte.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
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
            </React.Fragment>)
    }

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
                    Betäubungsmittel-Buchung hinzufügen
                 </Modal.Title>
            </Modal.Header>
            <Form onSubmit={createNewBuchung}>
                <Modal.Body>
                    <Form.Group as={Row} controlId="Typ">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Row sm={6}>
                                <Form.Check required
                                    type="radio"
                                    label="Zugang"
                                    name="TypRadio"
                                    id="ZugangRadio"
                                    onClick={() => setTyp('zugang')}
                                />
                                <Form.Check required
                                    type="radio"
                                    label="Abgang"
                                    name="TypRadio"
                                    id="AbgangRadio"
                                    onClick={() => setTyp('abgang')}
                                />
                            </Row>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="btmMenge">
                        <Form.Label column sm="2">
                            Menge
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="btmMenge" type="number" min="1" defaultValue="0" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="pruefdatum">
                        <Form.Label column sm="2">
                            Prüfdatum
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="pruefdatum" type="date" defaultValue={new Date()} />
                        </Col>
                    </Form.Group>

                    {typ.toLowerCase() === 'zugang' ? renderZugang() : null}
                    {typ.toLowerCase() === 'abgang' ? renderAbgang() : null}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={hideModal}>Close</Button>
                    <Button variant="primary" type="submit">Bestätigen</Button>
                </Modal.Footer>
            </Form>



        </Modal>
    )

}

export default NeueBuchungModal;