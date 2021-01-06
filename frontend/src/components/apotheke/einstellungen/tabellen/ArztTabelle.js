import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddBox, Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';
import { useSnackbar } from 'notistack';

import ArztAddModal from '../../../../modals/ArztAddModal';
import ArztEditModal from '../../../../modals/ArztEditModal';
import DeleteModal from '../../../../modals/DeleteModal';

function ArztTabelle(props) {
  const { apoId } = useParams();
  const [aerzte, setAerzte] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedArzt, setSelectedArzt] = useState(null);
  const [showArztAddModal, setShowArztAddModal] = useState(false);
  const [showArztEditModal, setShowArztEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getArztData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/arzt`, {
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
    }).then((data) => setAerzte(data)).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const deleteArzt = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/arzt/${selectedArzt.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      },
    }).then((res) => {
      if (res.status === 200) {
        getArztData()
        enqueueSnackbar('Arzt erfolgreich gelöscht', { variant: 'success', autoHideDuration: 3000 });
      } else {
        //SHOW ERROR
        console.log(res);
      }
    }).catch((err) => {
      //SHOW ERROR
      console.log(err);
    });
  }

  const edit = arzt => {
    setSelectedArzt(arzt);
    setShowArztEditModal(true);
  }

  const del = arzt => {
    setSelectedArzt(arzt);
    setShowDeleteModal(true);
  }

  useEffect(() => {
    getArztData();
  }, [])

  return (
    <Fragment>
      <ArztAddModal {...props} show={showArztAddModal} onHide={() => setShowArztAddModal(false)} updateArztData={getArztData} />
      {selectedArzt ? <ArztEditModal {...props} arzt={selectedArzt} show={showArztEditModal} onHide={() => setShowArztEditModal(false)} updateArztData={getArztData} /> : null}
      <DeleteModal {...props} headertext={'Arzt löschen'}
        maintext={'Möchtest du diesen Arzt wirklich löschen?'} onSubmit={deleteArzt} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'}
        show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Strasse</th>
            <th>Ort</th>
            <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              <Button onClick={() => setShowArztAddModal(true)} >Hinzufügen <AddBox /></Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {aerzte.map(arzt =>
            <tr key={arzt.id}>
              <td>{arzt.name}</td>
              <td>{arzt.anschrift.strasse} {arzt.anschrift.nummer}</td>
              <td>{arzt.anschrift.plz} {arzt.anschrift.ort}</td>
              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                {props.aktiveRolle.toLowerCase() === 'admin' ? <Fragment><Button onClick={() => edit(arzt)}><Edit /></Button>
                  <Button onClick={() => del(arzt)}><DeleteForever /></Button></Fragment> : null}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default ArztTabelle;
