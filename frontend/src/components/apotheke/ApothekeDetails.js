import React, {Component, Fragment} from 'react';
import {Table, Button} from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import ApothekeEditModal from '../../modals/ApothekeEditModal';
import ApothekeService from '../../services/ApothekeService';

class ApothekeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apotheke: {
        id: "",
        name: "",
        email: "",
        anschrift: {
          strasse: "",
          nummer: "",
          plz: "",
          ort: ""
        }
      },
      modalShow: false,
      isLoading: false
    };
    this.apothekeService = new ApothekeService();
  }

  async componentDidMount() {
    this.apothekeService.getUserApotheke()
    .then(data => this.setState({apotheke: data}))
    .catch(err => alert(err))
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
