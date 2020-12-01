import React from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import ApothekeRegisterModal from '../../modals/ApothekeRegisterModal';

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

	return (
		<Row>
			<ApothekeRegisterModal 
				show={modalShow}
				onHide={() => setModalShow(false)}
				apotheke = {apotheke} />
			<Col>
			<Form class="form-inline">
				<Form.Row>
					<Col>
						<Form.Control type="text" placeholder="Nutzername" />
					</Col>
					<Col>
					<Form.Control type="password" placeholder="Passwort" />
					</Col>
					<Col>
					<Button variant="primary" type="submit" href="BTMBuch">Login</Button>
					</Col>
				</Form.Row>
			</Form>
			</Col>
			<Col>
				<Button variant="primary" onClick={() => setModalShow(true)}>Apotheke Registrieren</Button>
			</Col>
		</Row>
	)
	
}

export default Startseite;
