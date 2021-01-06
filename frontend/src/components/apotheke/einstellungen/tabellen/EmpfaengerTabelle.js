import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

import EmpfaengerAddModal from '../../../../modals/EmpfaengerAddModal';
import EmpfaengerEditModal from '../../../../modals/EmpfaengerEditModal';
import DeleteModal from '../../../../modals/DeleteModal';

function EmpfaengerTabelle(props) {
  const { apoId } = useParams();
  const [empfaengeren, setEmpfaenger] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedEmpfaenger, setSelectedEmpfaenger] = useState(null);
  const [showEmpfaengerAddModal, setShowEmpfaengerAddModal] = useState(false);
  const [showEmpfaengerEditModal, setShowEmpfaengerEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getEmpfaengerData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/empfaenger`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else if (res.status === 403) {
        props.history.push('forbidden');
      } else if (res.status === 400) {
        props.history.push('badrequest');
      }
    }).then((data) => setEmpfaenger(data)).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const deleteEmpfaenger = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/empfaenger/${selectedEmpfaenger.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res.status === 200) {
        getEmpfaengerData()
        enqueueSnackbar('Empfaenger erfolgreich gelöscht', { variant: 'success', autoHideDuration: 3000 });
      } else {
        //SHOW ERROR
        console.log(res);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  }

  const edit = empfaenger => {
    setSelectedEmpfaenger(empfaenger);
    setShowEmpfaengerEditModal(true);
  }

  const del = empfaenger => {
    setSelectedEmpfaenger(empfaenger);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    getEmpfaengerData()
  }, [])

  return (
    <Fragment>
      <EmpfaengerAddModal {...props} show={showEmpfaengerAddModal} onHide={() => setShowEmpfaengerAddModal(false)} updateEmpfaengerData={getEmpfaengerData} />
      {selectedEmpfaenger ? <EmpfaengerEditModal {...props} empfaenger={selectedEmpfaenger} show={showEmpfaengerEditModal} onHide={() => setShowEmpfaengerEditModal(false)} updateEmpfaengerData={getEmpfaengerData} /> : null}
      <DeleteModal {...props} headertext={'Empfaenger löschen'}
        maintext={'Möchtest du diesen Empfaenger wirklich löschen?'} onSubmit={deleteEmpfaenger} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'}
        show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vorname</th>
            <th>Strasse</th>
            <th>Ort</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button onClick={() => setShowEmpfaengerAddModal(true)} >Hinzufügen <AddBox /></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.aktiveRolle.toLowerCase() === 'admin' ? empfaengeren.map(empfaenger =>
            <tr key={empfaenger.id}>
              <td>{empfaenger.name}</td>
              <td>{empfaenger.vorname}</td>
              <td>{empfaenger.anschrift.strasse} {empfaenger.anschrift.nummer}</td>
              <td>{empfaenger.anschrift.plz} {empfaenger.anschrift.ort}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Button onClick={() => edit(empfaenger)}><Edit /></Button>
                <Button onClick={() => del(empfaenger)}><DeleteForever /></Button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
      {props.aktiveRolle.toLowerCase() !== 'admin' ? <label>Nur Admins ist es erlaubt die Empfänger Tabelle zu sehen aus Datenschutzrechtlichen Gründen. Es können trotzdem neue Nutzer hinzugefügt werden.</label> : null}
    </Fragment>
  )
}

export default EmpfaengerTabelle;
