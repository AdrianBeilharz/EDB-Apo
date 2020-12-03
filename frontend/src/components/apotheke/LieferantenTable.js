import React, {Component, Fragment} from 'react';
import {Table} from 'react-bootstrap';

class LieferantenTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lieferantenListe: [
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
    }
  }

  render() {
    const lieferantenjsx = this.state.lieferantenListe.map((lieferant) =>
      <tr key={lieferant.id}>
      <td>{lieferant.name}</td>
      <td>{lieferant.adresse}</td>
    </tr>
    )
    return(
      <Fragment>
        <h3>Lieferanten</h3>
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
      </Fragment>
    )
  }
}

export default LieferantenTable;
