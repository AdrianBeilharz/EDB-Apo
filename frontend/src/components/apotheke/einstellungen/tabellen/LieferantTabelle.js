import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

import LieferantAddModal from '../../../../modals/LieferantAddModal';
import LieferantEditModal from '../../../../modals/LieferantEditModal';
import DeleteModal from '../../../../modals/DeleteModal';

function LieferantTabelle(props) {
  const { apoId } = useParams();
  const [lieferanten, setLieferanten] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedLieferant, setSelectedLieferant] = useState(null);
  const [showLieferantAddModal, setShowLieferantAddModal] = useState(false);
  const [showLieferantEditModal, setShowLieferantEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getLieferantData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/lieferant`, {
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
    }).then((data) => setLieferanten(data)).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const deleteLieferant = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/lieferant/${selectedLieferant.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res.status === 200) {
        getLieferantData()
        enqueueSnackbar('Lieferant erfolgreich gelöscht', { variant: 'success', autoHideDuration: 3000 });
      } else {
        //SHOW ERROR
        console.log(res);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  }

  const edit = lieferant => {
    setSelectedLieferant(lieferant);
    setShowLieferantEditModal(true);
  }

  const del = lieferant => {
    setSelectedLieferant(lieferant);
    setShowDeleteModal(true);
  }

  useEffect(getLieferantData, [apoId, props.history])

  return (
    <Fragment>
      <LieferantAddModal {...props} show={showLieferantAddModal} onHide={() => setShowLieferantAddModal(false)} updateLieferantData={getLieferantData} />
      {selectedLieferant ? <LieferantEditModal {...props} lieferant={selectedLieferant} show={showLieferantEditModal} onHide={() => setShowLieferantEditModal(false)} updateLieferantData={getLieferantData} /> : null}
      <DeleteModal {...props} headertext={'Lieferant löschen'}
        maintext={'Möchtest du diesen Lieferant wirklich löschen?'} onSubmit={deleteLieferant} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'}
        show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Strasse</th>
            <th>Ort</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button onClick={() => setShowLieferantAddModal(true)} >Hinzufügen <AddBox /></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {lieferanten.map(lieferant =>
            <tr key={lieferant.id}>
              <td>{lieferant.name}</td>
              <td>{lieferant.anschrift.strasse} {lieferant.anschrift.nummer}</td>
              <td>{lieferant.anschrift.plz} {lieferant.anschrift.ort}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {props.aktiveRolle.toLowerCase() === 'admin' ? <Fragment><Button onClick={() => edit(lieferant)}><Edit /></Button>
                  <Button onClick={() => del(lieferant)}><DeleteForever /></Button></Fragment> : null}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default LieferantTabelle;
