import React, {Component, Fragment} from 'react';
import {Table} from 'react-bootstrap';

class BenutzerTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      benutzerListe: [
        {
          id: "6c9a59ac-1a47-41c8-b4a3-d30cf0bdf804",
          rolle: "Admin",
          vorname: "Heinz",
          nachname: "Erhardt",
          nutzername: "ErhadtH",
          deaktiviert: false
        },
        {
          id: "6c538ce8-6f01-4b98-8ba5-140e1b8f0458",
          rolle: "Standardnutzer",
          vorname: "Karl",
          nachname: "Kleber",
          nutzername: "KleberK",
          deaktiviert: false
        }
      ]
    }
  }

  render() {
    const personal = this.state.benutzerListe.map((person) => 
    <tr key={person.id}>
      <td>{person.rolle}</td>
      <td>{person.vorname}</td>
      <td>{person.nachname}</td>
      <td>{person.nutzername}</td>
    </tr>);
    return(
      <Fragment>
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
            {personal}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default BenutzerTable;
