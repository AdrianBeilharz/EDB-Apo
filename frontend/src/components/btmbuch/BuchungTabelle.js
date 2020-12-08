import React, {useState} from 'react';
import {Table, Button, Row} from 'react-bootstrap';
import { Collapse } from '@material-ui/core';
import NeueBuchungModal from './NeueBuchungModal'

function BuchungTabelle(props) {
    let {btm} = props;
    const [open, setOpen] = useState(false);
    const [showBuchungModal, setShowBuchungModal] = useState(false);

    return (
        <React.Fragment>
            <NeueBuchungModal {...props} show={showBuchungModal} onHide={() => setShowBuchungModal(false)}/>
            <div style={{marginBottom:"2em"}}>
                <Row onClick={() => setOpen(!open)} className="noselect btm-table-header-name">
                    <div className="float-left">
                        <p className="float-left" >{btm.btm.name}</p>
                        <Button className="btn-circle" style={{marginLeft:'10px'}} onClick={event => {event.stopPropagation(); setShowBuchungModal(true)}}>+</Button>
                    </div>
                </Row>
                <Collapse in={open} >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Datum</th>
                            <th>Lieferant / Patient</th>
                            <th>Arztpraxis</th>
                            <th>Zugang</th>
                            <th>Abgang</th>
                            <th>Rezept Nr. / Lieferschein Nr.</th>
                            <th>Prüfdatum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {btm.buchungen.map(buchung =>
                                <tr key={buchung.id}>
                                    <td>{buchung.datum}</td>
                                    <td>{buchung.typ === 'ZUGANG' ? buchung.lieferant.name : buchung.empfaenger.vorname + " " + buchung.empfaenger.name}</td>
                                    <td>{buchung.typ === 'ABGANG' ? buchung.arzt.name : ''}</td>
                                    <td>{buchung.typ === 'ZUGANG' ? buchung.menge : ''}</td>
                                    <td>{buchung.typ === 'ZUGANG' ? '': buchung.menge}</td>
                                    <td>{buchung.typ === 'ZUGANG' ? buchung.anforderungsschein : buchung.rezept}</td>
                                    <td>{buchung.pruefdatum}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Collapse>
            </div>
        </React.Fragment>
    )
}



export default BuchungTabelle;