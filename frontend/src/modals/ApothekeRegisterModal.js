import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

class ApothekeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apotheke: props.apotheke,
      benutzer: props.benutzer,
      vorname: "",
      nachname: "",
      nutzername: "",
      rolle: "admin",
      password: "",
      passwordCheck: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeStrasse = this.handleChangeStrasse.bind(this);
    this.handleChangeNummer = this.handleChangeNummer.bind(this);
    this.handleChangePlz = this.handleChangePlz.bind(this);
    this.handleChangeOrt = this.handleChangeOrt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //  this...
  }

  handleChangeName(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        name: event.target.value,
      },
    }));
  }

  handleChangeEmail(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        email: event.target.value,
      },
    }));
  }

  handleChangeStrasse(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        adresse: {
          strasse: event.target.value,
        },
      },
    }));
  }

  handleChangeNummer(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        adresse: {
          nummer: event.target.value,
        },
      },
    }));
  }

  handleChangePlz(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        adresse: {
          plz: event.target.value,
        },
      },
    }));
  }

  handleChangeOrt(event) {
    this.setState((prevState) => ({
      apotheke: {
        ...prevState.apotheke,
        adresse: {
          ort: event.target.value,
        },
      },
    }));
  }

  handleChangeVorname = (event) => {
    this.setState({
      vorname: event.target.value,
    });
  }

  handleChangeNachname = (event) => {
    this.setState({
      nachname: event.target.value,
    });
  }

  handleChangeNutzername = (event) => {
    this.setState({
      nutzername: event.target.value,
    });
  }
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  handleChangePasswordCheck = (event) => {
    this.setState({
      passwordCheck: event.target.value,
    });
  }


  handleSubmit = (event) => {
    alert(`${this.state.vorname} ${this.state.nachname} ${this.state.nutzername} ${this.state.rolle} ${this.state.password}`);
    console.log("something should happen");
    //put apotheke.then status = 200 -> refresh data
    // this.props.submitApotheke(this.state.apotheke);
    this.props.onHide();
    event.preventDefault();
  };

  render() {
    const {vorname, nachname, nutzername, password, passwordCheck} = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Neue Apotheke registrieren</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Label>1. Schritt Apotheke erstellen</Form.Label>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Name der Apotheke"
                name="name"
                value={this.state.apotheke.name}
                onChange={this.handleChangeName}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="E-Mail der Apotheke"
                value={this.state.apotheke.email}
                onChange={this.handleChangeEmail}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Straße"
                  value={this.state.apotheke.adresse.strasse}
                  onChange={this.handleChangeStrasse}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Nummer"
                  value={this.state.apotheke.adresse.nummer}
                  onChange={this.handleChangeNummer}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="PLZ"
                  value={this.state.apotheke.adresse.plz}
                  onChange={this.handleChangePlz}
                />
              </Col>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Ort"
                  value={this.state.apotheke.adresse.ort}
                  onChange={this.handleChangeOrt}
                />
              </Col>
            </Form.Group>
            <Form.Label>2. Schritt Admin Nutzer erstellen</Form.Label>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Vorname"
                name="vorname"
                value={vorname}
                onChange={this.handleChangeVorname}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nachname"
                name="nachname"
                value={nachname}
                onChange={this.handleChangeNachname}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Nutzername"
                name="nutzername"
                value={nutzername}
                onChange={this.handleChangeNutzername}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Passwort erstellen"
                name="password"
                value={password}
                onChange={this.handleChangePassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="passwordCheck"
                placeholder="Passwort wiederholen"
                value={passwordCheck}
                onChange={this.handleChangePasswordCheck}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="Submit" onClick={this.handleSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ApothekeModal;
