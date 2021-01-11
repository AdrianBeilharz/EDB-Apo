import React, {useState} from 'react';
import Login from './Login'
import Header from '../headers/Header'
import { Row, Col, Button} from 'react-bootstrap';
import ApothekeRegisterModal from '../../modals/ApothekeRegisterModal';

function Startseite(props) {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [neuesApoRegisterModal, setNeuesApoRegisterModal] = useState(false);

    return(
        <React.Fragment>
            <Header {...props} 
                showLoginForm={showLoginForm} setShowLoginForm={setShowLoginForm}
                showLoginButton={true} />
            <div className="banner">
                <img className="bg-image" src="/images/background/bg1.svg" alt="" />

                <div style={{position:'absolute', margin:'0 10%', top:'0'}}>
                    <Row>
                        <Col>
                            <h2 className="header-text">Betäubungsmittel ganz einfach dokumentieren & verwalten</h2>
                            <Row style={{marginLeft:'0', alignItems:'baseline', marginTop:'1em'}}>
                                <Button onClick={() => setNeuesApoRegisterModal(true)}>Jetzt Apotheke anlegen</Button>
                                <p style={{color:'white', margin:'0 1em'}}>oder</p>
                                <Button onClick={() => setShowLoginForm(true)}>Login</Button>
                            </Row>
                        </Col>
                        <Col>
                            <img className="img" style={{marginTop:'5%'}} className="float-right" src="/images/pharma1.png" />
                        </Col>
                    </Row>
                    <Row style={{marginTop:'13em'}}>
                        <p>
                        EDB-Apo ist eine Plattform um Betäubungsmittel einer Apotheke zu verwalten.
                        Pharmazeutisches Personal kann sehr schnell über EDB-Apo die Zu- und Abgänge der Betäubungsmittel in der Apotheke
                        hinzufügen, einsehen, suchen und ausdrucken. 
                        </p>
                    </Row>
                    <Row style={{marginTop:'7.5em'}}>
                        <Col>
                            <h3>
                                <b>Verwalten von Buchungen</b>
                            </h3>
                            <ul>
                                <li>Neue Betäubungsmittel können sehr schnell angelegt werden</li>
                                <li>Übersicht über aktuelle Bestände</li>
                                <li>Integrierte Suchfunktion</li>
                                <li>Ausdrucken als PDF</li>
                                <li>Buchungen erstellen mit nur einem Klick</li>
                                <li>Einfaches Prüfen von Buchungen</li>
                            </ul>
                        </Col>
                        <Col>
                        <img className="img" style={{marginTop:'-5em'}} className="float-right" src="/images/pharma2.png" />
                        </Col>
                    </Row>
                </div>
                <img className="bg-image" style={{marginTop:'20em'}} src="/images/background/bg2.svg" alt="" />
                <div style={{backgroundColor:'#0e864e', paddingBottom:'4em'}}>
                    <Row>
                        <Col>
                            <img className="img" style={{margin:'-11em 0 0 5em'}} className="float-left" src="/images/akteure.png" />
                        </Col>
                        <Col style={{color:'white'}}>
                            <h3>
                                <b>Verwalten von Akteuren</b>
                            </h3>
                            <ul>
                                <li>Lieferanten, Ärzte, Pharmazeutisches Personal und Empfänger können angelegt und bearbeitet werden</li>
                                <li>Schnelles Hinzufügen von Personal in die Apotheke</li>
                                <li>Einfaches Verwalten von Daten</li>
                                <li>Integrierte Suchfunktion</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>

            <ApothekeRegisterModal
                                show={neuesApoRegisterModal}
                                {...props}
                                onHide={() => setNeuesApoRegisterModal(false)} ></ApothekeRegisterModal>
        </React.Fragment>
    )
}

export default Startseite;

