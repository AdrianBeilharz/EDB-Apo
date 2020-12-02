import React, {Component, Fragment} from 'react';
import {Table, Button} from 'react-bootstrap';
import ApothekeEditModal from '../../modals/ApothekeEditModal';

class ApothekeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apotheke: {
        id: "78067284-f459-4723-a7c7-9094dbc92ae1",
        name: "Apotheke Ohmenhausen",
        email: "apo@apo.de",
        adresse: {
          strasse: "Gomaringer Straße",
          nummer: 33,
          plz: "72770",
          ort: "Reutlingen"
        }
      },
      modalShow: false,
      isLoading: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/apotheke/1")
    .then(res => res.json())
    .then(data => this.setState({apotheke: data}))
  }

  toggleModal = () => this.setState({
    modalShow: !this.state.modalShow
  })

  render() {
    return (
      <Fragment>
        <ApothekeEditModal 
          show={this.state.modalShow}
          onHide={() => this.toggleModal()}
          apotheke={this.state.apotheke} />
        <h3>Apotheken Details</h3>
            
            
        <Table key={this.state.apotheke.id}>
        <tbody>
        <tr><td colSpan="2" >{this.state.apotheke.name}</td></tr>
        <tr><td colSpan="2" >{this.state.apotheke.email}</td></tr>
        <tr><td>{this.state.apotheke.adresse.strasse}</td><td>{this.state.apotheke.adresse.nummer}</td></tr>
        <tr><td>{this.state.apotheke.adresse.plz}</td><td>{this.state.apotheke.adresse.ort}</td></tr>
        </tbody>
        </Table>
        <Button variant="primary" onClick={this.toggleModal}>Apotheke editieren</Button>
        <Button variant="secondary" onClick={this.getData}>Fetch</Button>
      </Fragment>
    )
  }
}

export default ApothekeDetails;
