import React, {Component, Fragment} from 'react';
import {Table} from 'react-bootstrap';

class AerzteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aerzteListe: [
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
    }
  }

  render() {
    const aerztejsx = this.state.aerzteListe.map((arzt) =>
      <tr key={arzt.id}>
      <td>{arzt.name}</td>
      <td>{arzt.adresse}</td>
    </tr>
    )
    return(
      <Fragment>
        <h3>Ärzte</h3>
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
      </Fragment>
    )
  }
}

export default AerzteTable;
