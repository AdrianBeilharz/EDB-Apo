import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

import BtmAddModal from '../../../../modals/BtmAddModal';
import BtmEditModal from '../../../../modals/BtmEditModal';
import DeleteModal from '../../../../modals/DeleteModal';

function BtmTabelle(props) {
  const { apoId } = useParams();
  const [btmListe, setBtmListe] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedBtm, setSelectedBtm] = useState(null);
  const [showBtmAddModal, setShowBtmAddModal] = useState(false);
  const [showBtmEditModal, setShowBtmEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getBtmData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm`, {
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
    }).then((data) => setBtmListe(data)).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const deleteBtm = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm/${selectedBtm.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res.status === 200) {
        getBtmData()
        enqueueSnackbar('Btm erfolgreich gelöscht', { variant: 'success', autoHideDuration: 3000 });
      } else {
        //SHOW ERROR
        console.log(res);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  }

  const edit = btm => {
    setSelectedBtm(btm);
    setShowBtmEditModal(true);
  }

  const del = btm => {
    setSelectedBtm(btm);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    getBtmData()
  }, [])

  return (
    <Fragment>
      <BtmAddModal {...props} show={showBtmAddModal} onHide={() => setShowBtmAddModal(false)} updateBtmData={getBtmData} />
      {selectedBtm ? <BtmEditModal {...props} btm={selectedBtm} show={showBtmEditModal} onHide={() => setShowBtmEditModal(false)} updateBtmData={getBtmData} /> : null}
      <DeleteModal {...props} headertext={'Btm löschen'}
        maintext={'Möchtest du diesen Btm wirklich löschen?'} onSubmit={deleteBtm} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'}
        show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Darreichungsform</th>
            <th>Einheit</th>
            <th>Menge</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button onClick={() => setShowBtmAddModal(true)} >Hinzufügen <AddBox /></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {btmListe.map(btm =>
            <tr key={btm.id}>
              <td>{btm.name}</td>
              <td>{btm.darreichungsform}</td>
              <td>{btm.einheit}</td>
              <td>{btm.menge}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Button onClick={() => edit(btm)}><Edit /></Button>
                <Button onClick={() => del(btm)}><DeleteForever /></Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default BtmTabelle;
