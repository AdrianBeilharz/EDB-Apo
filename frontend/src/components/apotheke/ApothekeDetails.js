import React, {Component, Fragment} from 'react';
import {Table, Button} from 'react-bootstrap';
import ApothekeEditModal from '../../modals/ApothekeEditModal';
import ApothekeService from '../../services/ApothekeService';

class ApothekeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apotheke: {
        id: "78067284-f459-4723-a7c7-9094dbc92ae1",
        name: "Apotheke Ohmenhausen",
        email: "apo@apo.de",
        anschrift: {
          strasse: "Gomaringer Straße",
          nummer: 33,
          plz: "72770",
          ort: "Reutlingen"
        }
      },
      modalShow: false,
      isLoading: false
    };
    this.apothekeService = new ApothekeService();
  }

  async componentDidMount() {
    let data = await this.apothekeService.getApotheke("1")
    console.log(data)
    this.setState(
      {
        apotheke: data
      }
    )
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
        <tr><td>{this.state.apotheke.anschrift.strasse}</td><td>{this.state.apotheke.anschrift.nummer}</td></tr>
        <tr><td>{this.state.apotheke.anschrift.plz}</td><td>{this.state.apotheke.anschrift.ort}</td></tr>
        </tbody>
        </Table>
        <Button variant="primary" onClick={this.toggleModal}>Apotheke editieren</Button>
      </Fragment>
    )
  }
}

export default ApothekeDetails;
