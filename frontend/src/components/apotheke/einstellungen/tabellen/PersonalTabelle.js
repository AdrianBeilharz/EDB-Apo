import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';

import PersonalAddModal from '../../../../modals/PersonalAddModal';
import PersonalEditModal from '../../../../modals/PersonalEditModal';
import DeleteModal from '../../../../modals/DeleteModal';
import { useSnackbar } from 'notistack';

function PersonalTabelle(props) {
  const { apoId } = useParams();
  const [personal, setPersonal] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPersonalAddModal, setShowPersonalAddModal] = useState(false);
  const [showPersonalEditModal, setShowPersonalEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);



  const getPersonalData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer`, {
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
    }).then((data) => setPersonal(data)).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const deleteUser = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer/${selectedUser.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res && res.status === 200) {
        getPersonalData();
        enqueueSnackbar('Benutzer erfolgreich gelöscht', { variant: 'success', autoHideDuration: 3000 });
      } else {
        //SHOW ERROR
        console.log(res);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  }

  const del = user => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }
  const edit = user => {
    setSelectedUser(user);
    setShowPersonalEditModal(true);
  }

  useEffect(getPersonalData, [apoId, props.history])

  return (
    <Fragment>
      <PersonalAddModal {...props} show={showPersonalAddModal} onHide={() => setShowPersonalAddModal(false)} updatePersonalData={getPersonalData} />
      {selectedUser ? <PersonalEditModal {...props} user={selectedUser} show={showPersonalEditModal} onHide={() => setShowPersonalEditModal(false)} updatePersonalData={getPersonalData} /> : null}
      <DeleteModal {...props} headertext={'Benutzer löschen'}
        maintext={'Möchtest du diesen Benutzer wirklich löschen?'} onSubmit={deleteUser} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'}
        show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nutzername</th>
            <th>Nachname</th>
            <th>Vorname</th>
            <th>Aktiv</th>
            <th>Rolle</th>
            {props.aktiveRolle.toLowerCase() === 'admin' ? <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button onClick={() => setShowPersonalAddModal(true)} >Hinzufügen <AddBox /></Button>
            </th> : null}
          </tr>
        </thead>
        <tbody>
          {personal.map(user =>
            <tr key={user.id}>
              <td>{user.nutzername}</td>
              <td>{user.name}</td>
              <td>{user.vorname}</td>
              <td>{user.aktiv ? 'ja' : 'nein'}</td>
              <td>{user.rolle}</td>
              {props.aktiveRolle.toLowerCase() === 'admin' ? <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Button onClick={() => edit(user)}><Edit /></Button>
                <Button onClick={() => del(user)}><DeleteForever /></Button> 
              </td> : null}
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default PersonalTabelle;
