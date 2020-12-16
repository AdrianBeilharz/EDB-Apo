import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "./useForm";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function ApothekeRegisterModal(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [showContinueModal, setShowContinueModal] = useState(false);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setShowContinueModal(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setShowContinueModal(false);
  };

  const createNewApo = () => {
    let body = {
      name: values.name,
      email: values.email,
      anschrift: {
        strasse: values.strasse,
        nummer: values.nummer,
        plz: values.plz,
        ort: values.ort,
      },
    };
    return fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.log(err);
    });
  };

  const createNewAdmin = (apoId) => {
    let body = {
      name: values.nachname,
      vorname: values.vorname,
      nutzername: values.nutzername,
      passwort: passwords.password,
      rolle: 'ADMIN',
    };

    return fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).catch((err) => {
      console.log(err);
    });
  };

  const login = async () => {
    let body = {
      username: values.nutzername,
      password: passwords.password,
    };
    return await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  };

  const [passwords, setPasswords] = React.useState({
    password: "",
    passwordCheck: "",
  });

  function handleChangePassword(e) {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async event => {
    event.preventDefault();

    //ERROR HANDLING MISSING
    // let { username, neuesPasswort} = event.target;
    let apoResponse = await createNewApo();
    if (apoResponse.status === 201) {
      let apoId = await apoResponse.json();
      let adminRespone = await createNewAdmin(apoId.id);
      if (adminRespone.status === 201) {
        let loginResponse = await login();
        if (loginResponse.status === 200) {
          const data = await loginResponse.json();
          window.sessionStorage.setItem("edbapo-jwt", data.jwt);
          props.history.push(`/apotheke/${data.apothekeId}`);
        }
      }
    }
  };

  const cancel = () => {
    setShowContinueModal(false);
  };

  const renderSchritt1 = () => {
    return (
      <React.Fragment>
        <Form.Label>1. Schritt Apotheke erstellen</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Control
              required
              type="text"
              placeholder="Name der Apotheke"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="E-Mail der Apotheke"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={9} controlId="strasse">
            <Form.Control
              required
              type="text"
              placeholder="Straße"
              name="strasse"
              value={values.strasse}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} sm={3} controlId="nummer">
            <Form.Control
              required
              type="number"
              placeholder="Nummer"
              name="nummer"
              value={values.nummer}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={3} controlId="plz">
            <Form.Control
              required
              type="text"
              placeholder="PLZ"
              name="plz"
              value={values.plz}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} sm={9} controlId="ort">
            <Form.Control
              required
              type="text"
              placeholder="Ort"
              name="ort"
              value={values.ort}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
      </React.Fragment>
    );
  };

  const renderSchritt2 = () => {
    return (
      <React.Fragment>
        <Form.Label>2. Schritt Admin Nutzer erstellen</Form.Label>
        <Form.Group controllId="vorname">
          <Form.Control
            required="required"
            type="text"
            placeholder="Vorname"
            name="vorname"
            value={values.vorname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controllId="nachname">
          <Form.Control
            required="required"
            type="text"
            placeholder="Nachname"
            name="nachname"
            value={values.nachname}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controllId="nutzername">
          <Form.Control
            required="required"
            type="text"
            placeholder="Nutzername"
            name="nutzername"
            value={values.nutzername}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controllId="password">
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
      </React.Fragment>
    );
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title>Neue Apotheke registrieren</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {showContinueModal ? renderSchritt2() : renderSchritt1()}
        </Modal.Body>
        <MobileStepper
          variant="dots"
          steps={2}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button
              size="small"
              type={activeStep == 1 ? "submit" : "button"}
              onClick={activeStep == 0 ? handleNext : null}
              disabled={activeStep === 2}
            >
              {activeStep === 1 ? 'Registrien' : 'Weiter'}
              {theme.direction === "rtl" ? (<KeyboardArrowLeft />) : (<KeyboardArrowRight />)}
            </Button>
          }
          backButton={
            <Button
              size="small"
              type={activeStep == 1 ? "submit" : "button"}
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Zurück
            </Button>
          }
        />
      </Form>
    </Modal>
  );
}
export default ApothekeRegisterModal;
