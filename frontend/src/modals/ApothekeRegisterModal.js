import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "./useForm";

const ApotheReagisterkeModal = (props) => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    strasse: "",
    nummer: "",
    plz: "",
    ort: "",
    vorname: "",
    nachname: "",
    nutzername: "",
    rolle: "Admin",
  });

  const [passwords, setPasswords] = React.useState({
    password: "",
    passwordCheck: "",
  });

  //Miriam TODO
  /*
  const checkPassword = () => {
    if (!this.passwords.password || this.passwords.password !== this.passwords.passwordCheck) {
      error();
    } else {
      noError();
    }
  };
*/

  function handleChangePassword (e) {
    setPasswords({
			...passwords,
			[e.target.name]: e.target.value
		})

  } 
 
const handleSubmit = (e)=> {
  alert(
    `${values.vorname} ${values.nachname} ${values.nutzername} ${values.password}`
  );
    props.onHide();
    e.preventDefault();
    //put apotheke.then status = 200 -> refresh data  
  }; 

  return (
    <Modal show={props.show} onHide={props.onHide} centered backdrop="static" >
      <Modal.Header>
        <Modal.Title>Neue Apotheke registrieren</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit.bind(this)}>
          <Form.Label>1. Schritt Apotheke erstellen</Form.Label>
          <Form.Group controlId="test">
            <Form.Control
              required="required"
              type="text"
              placeholder="Name der Apotheke"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required="required"
              type="email"
              placeholder="E-Mail der Apotheke"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={9}>
              <Form.Control
                required="required"
                type="text"
                placeholder="Straße"
                name="strasse"
                value={values.strasse}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Control
                required="required"
                type="number"
                placeholder="Nummer"
                name="nummer"
                value={values.nummer}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <Form.Control
                required="required"
                type="text"
                placeholder="PLZ"
                name="plz"
                value={values.plz}
                onChange={handleChange}
              />
            </Col>
            <Col sm={9}>
              <Form.Control
                required="required"
                type="text"
                placeholder="Ort"
                name="ort"
                value={values.ort}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Label>2. Schritt Admin Nutzer erstellen</Form.Label>
          <Form.Group>
            <Form.Control
              required="required"
              type="text"
              placeholder="Vorname"
              name="vorname"
              value={values.vorname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required="required"
              type="text"
              placeholder="Nachname"
              name="nachname"
              value={values.nachname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required="required"
              type="text"
              placeholder="Nutzername"
              name="nutzername"
              value={values.nutzername}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required="required"
              type="password"
              placeholder="Passwort erstellen"
              name="password"
              value={passwords.password}
              onChange={handleChangePassword}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required="required"
              type="password"
              name="passwordCheck"
              placeholder="Passwort wiederholen"
              value={passwords.passwordCheck}
              onChange={handleChangePassword}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" name="submit" onClick={handleSubmit}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ApotheReagisterkeModal;
