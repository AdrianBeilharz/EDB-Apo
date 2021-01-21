import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

import BtmAddModal from '../../../../modals/BtmAddModal';
import BtmEditModal from '../../../../modals/BtmEditModal';
import DeleteModal from '../../../../modals/DeleteModal';

function BtmTabelle(props) {
  const { apoId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedBtm, setSelectedBtm] = useState(null);
  const [showBtmAddModal, setShowBtmAddModal] = useState(false);
  const [showBtmEditModal, setShowBtmEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteBtm = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm/${selectedBtm.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res.status === 200) {
        props.updateBtmList();
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

  return (
    <Fragment>
      <BtmAddModal {...props} show={showBtmAddModal} onHide={() => setShowBtmAddModal(false)} updateBtmData={props.updateBtmList} />
      {selectedBtm ? <BtmEditModal {...props} btm={selectedBtm} show={showBtmEditModal} onHide={() => setShowBtmEditModal(false)} updateBtmData={props.updateBtmList} /> : null}
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
          {props.btms.map(btm =>
            <tr key={btm.id}>
              <td>{btm.name}</td>
              <td>{btm.darreichungsform}</td>
              <td>{btm.einheit}</td>
              <td>{btm.menge}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {props.aktiveRolle.toLowerCase() === 'admin' ? <Fragment><Button onClick={() => edit(btm)}><Edit /></Button>
                  <Button onClick={() => del(btm)}><DeleteForever /></Button></Fragment> : null}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default BtmTabelle;
