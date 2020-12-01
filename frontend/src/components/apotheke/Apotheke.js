import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import ApothekeEditModal from '../../modals/ApothekeEditModal';

function Apotheke(props) {
  //static objects and lists must be swapped to api calls to load all the data
  var apotheke = {
    id: "78067284-f459-4723-a7c7-9094dbc92ae1",
    name: "Apotheke Ohmenhausen",
    email: "apo@apo.de",
    adresse: {
      strasse: "Gomaringer Straße",
      nummer: 33,
      plz: "72770",
      ort: "Reutlingen"
    }
  }

  var pharmPersListe = [
    {
      id: "6c9a59ac-1a47-41c8-b4a3-d30cf0bdf804",
      rolle: "Admin",
      vorname: "Heinz",
      nachname: "Erhardt",
      nutzername: "ErhadtH"
    },
    {
      id: "6c538ce8-6f01-4b98-8ba5-140e1b8f0458",
      rolle: "Standardnutzer",
      vorname: "Karl",
      nachname: "Kleber",
      nutzername: "KleberK"
    }
  ]

  var btmListe = [
    {
      id: "16eef787-9c6a-4c01-8979-4f8b10e5148a",
      name: "Kapros Akut 20 mg",
      drform: "Tabletten",
      einheit: "Stück"
    },
    {
      id: "7c344c73-86fe-466e-8fce-7b2d584d5b72",
      name: "Kapros Akut 20 mg",
      drform: "Tabletten",
      einheit: "Stück"
    }
  ]

  var aerzteListe = [
    {
      id: "44d94a5c-70a1-4f3b-a5a4-54eb4a5eeb03",
      name: "Dr. Krause",
      adresse: "Straße 4 09845 Stadt"
    },
    {
      id: "580371fb-f318-4529-b955-1700d1a3547c",
      name: "Dr. Bernhard",
      adresse: "Straße 5 09834 Dorf"
    }
  ]

  var lieferantenListe = [
    {
      id: "44d94a5c-70a1-4f3b-a5a4-54eb4a5eeb03",
      name: "Liefer",
      adresse: "Straße 1 09845 Stadt"
    },
    {
      id: "580371fb-f318-4529-b955-1700d1a3547c",
      name: "ant",
      adresse: "Straße 7 09834 Dorf"
    }
  ]

  function ApoDetails() {
    return (
    <Table key={apotheke.id}>
      <tbody>
      <tr><td colSpan="2" >{apotheke.name}</td></tr>
      <tr><td colSpan="2" >{apotheke.email}</td></tr>
      <tr><td>{apotheke.adresse.strasse}</td><td>{apotheke.adresse.nummer}</td></tr>
      <tr><td>{apotheke.adresse.plz}</td><td>{apotheke.adresse.ort}</td></tr>
      </tbody>
    </Table>
    )
  }

  function PharmPersonal() {
    const personal = pharmPersListe.map((person) => 
      <tr key={person.id}>
        <td>{person.rolle}</td>
        <td>{person.vorname}</td>
        <td>{person.nachname}</td>
        <td>{person.nutzername}</td>
      </tr>
    );
    return (
      <Table striped bordered hover>
        <thead>
              <tr>
                <th>Rolle</th>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Nutzername</th>
              </tr>
            </thead>
            <tbody>
              {personal}
            </tbody>
      </Table>
    )
  }

  function BTM() {
    const btmjsx = btmListe.map((btm) =>
      <tr key={btm.id}>
        <td>{btm.name}</td>
        <td>{btm.drform}</td>
        <td>{btm.einheit}</td>
      </tr>
    );
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Darreichungsform</th>
            <th>Einheit</th>
          </tr>
        </thead>
        <tbody>
          {btmjsx}
        </tbody>
      </Table>
    )
  }

  function Aerzte() {
    const aerztejsx = aerzteListe.map((arzt) =>
      <tr key={arzt.id}>
      <td>{arzt.name}</td>
      <td>{arzt.adresse}</td>
    </tr>
    )
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Anschrift</th>
          </tr>
        </thead>
        <tbody>
          {aerztejsx}
        </tbody>
      </Table>
    )
  }

  function Lieferanten() {
    const lieferantenjsx = lieferantenListe.map((lieferant) =>
      <tr key={lieferant.id}>
      <td>{lieferant.name}</td>
      <td>{lieferant.adresse}</td>
    </tr>
    )
    return(
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Anschrift</th>
          </tr>
        </thead>
        <tbody>
          {lieferantenjsx}
        </tbody>
      </Table>
    )
  }

  function updateApotheke(apo) {
    console.log("something is happening");
    apotheke = apo;
    console.log(apotheke);
    console.log(apo);
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <ApothekeEditModal 
				show={modalShow}
        onHide={() => setModalShow(false)}
        submitApotheke = {(apo) => updateApotheke(apo)}
        apotheke={apotheke} />
      <Row>
        <Col md={{ span: 2, offset: 1 }} >
          <h3>Apotheken Details</h3>
          <ApoDetails />
          <Button variant="primary" onClick={() => setModalShow(true)}>Apotheke editieren</Button>
        </Col>
        <Col md={{ span: 4, offset: 3 }}>
          <h3>Pharmazeutisches Personal</h3>
          <PharmPersonal />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h3>Betäubungsmittel</h3>
          <BTM />
        </Col>
        <Col md={4}>
          <h3>Ärzte</h3>
          <Aerzte />
        </Col>
        <Col md={4}>
          <h3>Lieferanten</h3>
          <Lieferanten />
        </Col>
      </Row>
    </div>
  )
}

export default Apotheke;
