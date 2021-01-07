import React,{useEffect} from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';



function UpdateBuchungModal(props) {

    // let apothekeId = sessionStorage.getItem('apothekeId');
    const { apoId } = useParams();
    // eslint-disable-next-line
    let {lieferanten, aerzte, empfaenger} = props;
    const { enqueueSnackbar } = useSnackbar();

    const sendUpdateRequest = async (buchungData) => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung/${props.buchung.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
            },
            body: JSON.stringify(buchungData)
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });


        if (response && response.status === 200) {
            props.onHide();
            enqueueSnackbar('Buchung erfolgreich aktualisiert', { variant: 'success', autoHideDuration: 3000 });
            props.apothekeRefFunctions.updateBtmList();
        } else {
            //SHOW ERROR
            console.log(response);
        }
    }




    const updateBuchung = event => {
        event.preventDefault();

        if (props.buchung.typ.toLowerCase() === 'zugang') {
            let { anforderungsschein, btmMenge, lieferant, pruefdatum, datum } = event.target;
            let buchungData = {
                benutzer: props.user.id,
                btm: props.btm.btm.id,
                menge: btmMenge.value,
                typ: 'ZUGANG',
                lieferant: lieferant.value,
                anforderungsschein: anforderungsschein.value,
                pruefdatum: pruefdatum.value,
                datum: datum.value
            }
            sendUpdateRequest(buchungData);
        } else if (props.buchung.typ.toLowerCase() === 'abgang') {
            let { btmMenge, rezept, empfaenger, arzt, pruefdatum, datum} = event.target;
            let buchungData = {
                benutzer: props.user.id,
                btm: props.btm.btm.id,
                menge: btmMenge.value,
                typ: 'ABGANG',
                empfaenger: empfaenger.value,
                arzt: arzt.value,
                rezept: rezept.value,
                pruefdatum: pruefdatum.value,
                datum: datum.value
            }
            sendUpdateRequest(buchungData);
        }
    }

    


    function Zugang({ buchung }) {
        if (buchung.typ) {
            if (buchung.typ.toLowerCase() === 'zugang') {
                return (
                    <React.Fragment>
                        <Form.Group as={Row} controlId="anforderungsschein">
                            <Form.Label column sm="2">
                                Anforderungsschein
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="anforderungsschein" type="text" required defaultValue={buchung.anforderungsschein} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="lieferant">
                            <Form.Label column sm="2">
                                Lieferant
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="lieferant" defaultValue={buchung.lieferant.name} required as="select">
                                     {console.log('lieferanten', lieferanten)}   
                                    {lieferanten.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </React.Fragment>)
            }
        }
        return null;
    }

    function Abgang({ buchung }) {
        if (buchung.typ) {
            if (buchung.typ.toLowerCase() === 'abgang') {
                return (
                    <React.Fragment>
                        <Form.Group as={Row} controlId="empfaenger">
                            <Form.Label column sm="2">
                                Empfaenger
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="empfaenger" defaultValue={buchung.empfaenger.name} required as="select">
                                    {empfaenger.map(e => <option key={e.id} value={e.id}>{e.vorname} {e.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="arzt">
                            <Form.Label column sm="2">
                                Arzt
                    </Form.Label>
                            <Col sm="10">
                                <Form.Control name="arzt" defaultValue={buchung.arzt.name} required as="select">
                                    {aerzte.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="rezept">
                            <Form.Label column sm="2">
                                Rezept
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={buchung.rezept} name="rezept" type="text" required />
                            </Col>
                        </Form.Group>
                    </React.Fragment>)
            }
        }
        return null;
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
                    Betäubungsmittel-Buchung aktualisieren
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={updateBuchung}>
                <Modal.Body>
                <Form.Group as={Row} controlId="datum">
                        <Form.Label column sm="2">
                            Datum
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="datum" type="date" defaultValue={props.buchung.datum} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="btmMenge">
                        <Form.Label column sm="2">
                            Menge
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="btmMenge" type="number" min="1" defaultValue={props.buchung.menge} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="pruefdatum">
                        <Form.Label column sm="2">
                            Prüfdatum
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="pruefdatum" type="date" defaultValue={props.buchung.pruefdatum} />
                        </Col>
                    </Form.Group>
                    <Zugang buchung={props.buchung} />
                    <Abgang buchung={props.buchung} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.onHide}>Abbrechen</Button>
                    <Button variant="primary" type="submit">Bestätigen</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateBuchungModal;
