import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { useForm } from "./useForm";


function ApothekeRegisterModal(props) {
  const [step1WeiterButtonDisabled, setStep1WeiterButtonDisabled] = useState(true);
  const [fields, setFields] = useState({name: "", email: "", strasse: "",nummer: "", plz: "", ort: "" });
  const [passwords, setPasswords] = useState({password: "", passwordCheck: ""});
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [passwordsAreValid, setPasswordsAreValid] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(true);
 
  const [values, handleChangeCustom] = useForm({
    vorname: "",
    nachname: "",
    nutzername: "",
    rolle: "Admin",
  });

  const handleChange = (e) =>  {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
    checkPlzOrt();
  }

  const checkPlzOrt = () => {
    if(fields.plz.match('[0-9]{5}') && fields.plz.length === 5 && fields.ort.length >= 2) {
      setStep1WeiterButtonDisabled(false);
    }
    else{
      setStep1WeiterButtonDisabled(true);
    }
  }

  const validation = () => {
    checkPlzOrt();
    checkPasswords();
    checkUsernameTaken();
  }

  const handleBack = () => {
    setShowContinueModal(false);
  };

  const createNewApo = () => {
    let body = {
      name: fields.name,
      email: fields.email,
      anschrift: {
        strasse: fields.strasse,
        nummer: fields.nummer,
        plz: fields.plz,
        ort: fields.ort,
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

  const handleChangePassword = async (e) => {
    const { name, value } = e.target;

    setPasswords({
      ...passwords,
      [name]: value,
    });
    checkPasswords();
  }


  const checkPasswords = () => {
    let pw = passwords.password;
    let check = passwords.passwordCheck;
    if (pw !== '' && pw.length >= 5 && pw === check) {
      setPasswordsAreValid(true);
    }else {
      setPasswordsAreValid(false);
    }
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

  const checkUsernameTaken = async () => {
    if(values.nutzername){
      await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/${values.nutzername}/checkUsername`, {
        method: 'POST',
      }).then((res) => {
        if (res.status === 200) {
          setUsernameTaken(false);
        } else if (res.status === 400) {
          setUsernameTaken(true);
        }
      }).catch((err) => {
        console.log(err);
        setUsernameTaken(true);
      });
    }
  }

  useEffect(() => {
    validation();
  })


  const renderSchritt1 = () => {
    return (
        <React.Fragment >
        <Form.Label>1. Schritt Apotheke erstellen</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required="required"
              type="text"
              placeholder="Name der Apotheke"
              name="name"
              value={fields.name}
              onChange={(e) => handleChange(e)}
              isValid={fields.name.match("[A-Za-z]{1,32}")}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
             <Form.Label>E-Mail</Form.Label>
            <Form.Control
              required="required"
              type="email"
              placeholder="E-Mail der Apotheke"
              name="email"
              value={fields.email}
              onChange={(e) => handleChange(e)}
              isValid={fields.email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")}
            />
          </Form.Group>

        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} sm={9} controlId="strasse">
            <Form.Label>Straße</Form.Label>
            <Form.Control
              required="required"
              type="text"
              placeholder="Straße"
              name="strasse"
              value={fields.strasse}
              onChange={(e) => handleChange(e)}
              isValid={fields.strasse.length >= 3}
            />
          </Form.Group>
          <Form.Group as={Col} sm={3} controlId="nummer">
            <Form.Label>Nummer</Form.Label>
            <Form.Control
              required="required"
              type="number"
              placeholder="0"
              name="nummer"
              min="0"
              value={fields.nummer}
              onChange={(e) => handleChange(e)}
              isValid={fields.nummer > 0}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} sm={3} controlId="plz" >
          <Form.Label>PLZ</Form.Label>
            <Form.Control
              required="required"
              type="text"
              placeholder="PLZ"
              name="plz"
              value={fields.plz}
              onChange={(e) => handleChange(e)}
              isValid={fields.plz.length === 5}
            />
          </Form.Group>
          <Form.Group as={Col} sm={9} controlId="ort">
          <Form.Label>Ort</Form.Label>
            <Form.Control
             required="required"
              type="text"
              placeholder="Ort"
              name="ort"
              value={fields.ort}
              onChange={(e) => handleChange(e)} 
              isValid={fields.ort.length > 3}
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
        <Form.Group controlId="vorname">
          <Form.Label>Vorname</Form.Label>
          <Form.Control
            required="required"
            type="text"
            placeholder="Vorname"
            name="vorname"
            value={values.vorname}
            onChange={handleChangeCustom}
            isValid={values.vorname.match("[A-Za-z]{1,32}")}
          />
        </Form.Group>
        <Form.Group controlId="nachname">
        <Form.Label>Nachname</Form.Label>
          <Form.Control
            required="required"
            type="text"
            placeholder="Nachname"
            name="nachname"
            value={values.nachname}
            onChange={handleChangeCustom}
            isValid={values.nachname.match("[A-Za-z]{1,32}")}
          />
        </Form.Group>
        <Form.Group controlId="nutzername">
        <Form.Label>Nutzername</Form.Label>
          <Form.Control
            required="required"
            type="text"
            placeholder="Nutzername"
            name="nutzername"
            value={values.nutzername}
            onChange={handleChangeCustom}
            isValid={values.nutzername.match("[A-Za-z]{1,32}") && !usernameTaken}
          />
        </Form.Group>
        <Form.Group controlId="password">
        <Form.Label>Passwort</Form.Label>
          <Form.Control
            required="required"
            type="password"
            placeholder="Passwort erstellen"
            name="password"
            value={passwords.password}
            onChange={(e) => handleChangePassword(e)}
            isValid={passwordsAreValid}
          />
        </Form.Group>
        <Form.Group>
        <Form.Label>Passwort bestätigen</Form.Label>
          <Form.Control
            required="required"
            type="password"
            name="passwordCheck"
            placeholder="Passwort wiederholen"
            value={passwords.passwordCheck}
            onChange={(e) => {handleChangePassword(e); checkPasswords()}}
            isValid={passwordsAreValid}
          />
        </Form.Group>
      </React.Fragment>
    );
  };

  const renderWeiterBt = () => {
    return (
      <Button disabled={step1WeiterButtonDisabled} onClick={() => setShowContinueModal(true)}>Weiter</Button>
    )
  }

  const renderRegistrierenBt = () => {
    return(
      <Button disabled={!(!usernameTaken && passwordsAreValid)} type="submit" >Registrieren</Button>
    )
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Neue Apotheke registrieren</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {showContinueModal ? renderSchritt2() : renderSchritt1()}
        </Modal.Body>
     
      <Modal.Footer>
        <Button variant="danger" onClick={showContinueModal ? handleBack : props.onHide}>{showContinueModal ? 'Zurück' : 'Abbrechen'}</Button>
        {showContinueModal ? renderRegistrierenBt() : renderWeiterBt()}
      </Modal.Footer>
       </Form>
    </Modal>
  );
}
export default ApothekeRegisterModal;
