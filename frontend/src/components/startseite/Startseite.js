import React from 'react';
import {Row, Col, Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ApothekeRegisterModal from '../../modals/ApothekeRegisterModal';
import AuthorizationService from '../../services/AuthorizationService';

function Startseite() {
	const [modalShow, setModalShow] = React.useState(false);
	const [credentials, setState] = React.useState({
		username: "",
		password: ""
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
		authService.login(credentials)
		.then(tokens => {
			console.log(tokens)
			sessionStorage.setItem("jwt", tokens.jwt);
			sessionStorage.setItem("apothekeId", tokens.apothekeId);
			history.push("BTMBuch")
		})
		.catch(err => alert(err))
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
						<Form.Control type="text" name="username" placeholder="Nutzername" value={credentials.username} onChange={handleChange} />
					</Col>
					<Col>
            <Form.Control type="password" name="password" placeholder="Passwort" value={credentials.password} onChange={handleChange} />
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
