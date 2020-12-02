import React, {Component, Fragment} from 'react';
import {Table} from 'react-bootstrap';

class BTMTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BTMListe: [
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
    }
  }
  render() {
    const btmjsx = this.state.BTMListe.map((btm) =>
      <tr key={btm.id}>
        <td>{btm.name}</td>
        <td>{btm.drform}</td>
        <td>{btm.einheit}</td>
      </tr>
    );
    return(
      <Fragment>
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
          {btmjsx}
        </tbody>
      </Table>
      </Fragment>
    )
  }
}

export default BTMTable;
