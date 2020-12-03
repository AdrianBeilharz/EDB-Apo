import React from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ApothekeRegisterModal from '../../modals/ApothekeRegisterModal';
import AuthorizationService from '../../services/AuthorizationService';

function Startseite() {
	const [modalShow, setModalShow] = React.useState(false);
	const [credentials, setState] = React.useState({
		nutzername: "",
		passwort: ""
	});
	function handleChange(event) {
		setState({
			...credentials,
			[event.target.name]: event.target.value
		})
	}
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
	const history = useHistory();
	const authService = new AuthorizationService();

	const login = (e) => {
		e.preventDefault()
		console.log("get status ok and redirect to BTMBuch of user")
		authService.login(credentials.nutzername, credentials.passwort)
		.then(status => {
			console.log(status)
			history.push("BTMBuch")
		}) // doesnt wait for async function call so i dont know what to do but here is the code

	}



	return (
		<Row>
			<ApothekeRegisterModal 
				show={modalShow}
				onHide={() => setModalShow(false)}
				apotheke = {apotheke} />
			<Col>
			<Form class="form-inline" onSubmit={e => login(e)}>
				<Form.Row>
					<Col>
						<Form.Control type="text" name="nutzername" placeholder="Nutzername" value={credentials.nutzername} onChange={handleChange} />
					</Col>
					<Col>
            <Form.Control type="password" name="passwort" placeholder="Passwort" value={credentials.passwort} onChange={handleChange} />
          </Col>
					<Col>
					<Button variant="primary" type="submit">Login</Button>
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
