import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import ApothekeRegisterModal from '../../modals/ApothekeRegisterModal';
import Login from './Login';
import AuthorizationService from '../../services/AuthorizationService';

function Startseite() {
	const [modalShow, setModalShow] = React.useState(false);
	var apotheke = {
		id: "",
		name: "",
		email: "",
		adresse: {
			strasse: "",
			nummer: "",
			plz: "",
			ort: ""
		}
	}

	const login = (nutzername, passwort) => {
		new AuthorizationService().login(nutzername, passwort);
	}



	return (
		<Row>
			<ApothekeRegisterModal 
				show={modalShow}
				onHide={() => setModalShow(false)}
				apotheke = {apotheke} />
			<Col>
				<Login 
				login={(nutzername, password) => login(nutzername, password)}/>
			</Col>
			<Col>
				<Button variant="primary" onClick={() => setModalShow(true)}>Apotheke Registrieren</Button>
			</Col>
		</Row>
	)
	
}

export default Startseite;
