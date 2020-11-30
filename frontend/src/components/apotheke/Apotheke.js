import React from 'react';
import {Row, Col, Button, Table} from 'react-bootstrap';

function Apotheke () {
    return (
      <div>
        <Row>
          <Col md={{span: 2, offset: 1}} >
            <h3>Apotheken Details</h3>
            <Row><Col><label>Apotheke Ohmenhausen</label></Col></Row>
            <Row><Col><label>apo@apo.de</label></Col></Row>
            <Row><Col><label>Straße</label></Col><Col><label>10</label></Col></Row>
            <Row><Col><label>PLZ</label></Col><Col><label>Ohmenhausen</label></Col></Row>
            <Row><Col><Button variant="primary" >Apotheke editieren</Button></Col></Row>

          </Col>
          <Col md={{span: 4, offset: 3}}>
            <h3>Pharmazeutisches Personal</h3>
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
                <tr>
                  <td>Prüfer</td>
                  <td>Heinz</td>
                  <td>Erhardt</td>
                  <td>ErhardthH</td>
                </tr>
                <tr>
                  <td>Standardnutzer</td>
                  <td>Heinz</td>
                  <td>Erhardt</td>
                  <td>ErhardthH</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
          <h3>Betäubungsmittel</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Darreichungsform</th>
                  <th>Einheit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kapros Akut 20 mg</td>
                  <td>Tabletten</td>
                  <td>Stück</td>
                </tr>
                <tr>
                  <td>Kapros Akut 20 mg</td>
                  <td>Tabletten</td>
                  <td>Stück</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
          <h3>Ärzte</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Anschrift</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dr. Krause</td>
                  <td>Straße 4 09845 Stadt</td>
                </tr>
                <tr>
                  <td>Dr. Krause</td>
                  <td>Straße 4 09845 Stadt</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
          <h3>Lieferanten</h3>
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Anschrift</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gehe</td>
                  <td>Straße 4 09845 Stadt</td>
                </tr>
                <tr>
                  <td>Anzak</td>
                  <td>Straße 4 09845 Stadt</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
}

export default Apotheke;
