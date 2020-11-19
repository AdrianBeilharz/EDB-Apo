import React from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import ApothekeModal from '../../modals/ApothekeModal';

function Startseite() {
	const [modalShow, setModalShow] = React.useState(false);


	return (
		<Row>
			<ApothekeModal 
				show={modalShow}
				onHide={() => setModalShow(false)} />
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
