import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';

function BtmTabelle(props) {
  const { id } = useParams();
  const [btmListe, setBtmListe] = useState([]);

  const getPersonalData = async () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${id}/btm`, {
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

  useEffect(() => {
    getPersonalData()
  }, [])

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Darreichungsform</th>
            <th>Einheit</th>
            <th>Menge</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {btmListe.map(btm =>
            <tr key={btm.id}>
              <td>{btm.name}</td>
              <td>{btm.darreichungsform}</td>
              <td>{btm.einheit}</td>
              <td>{btm.menge}</td>
              <td>
                <Button onClick={() => console.log("update")}><Edit /></Button>
                <Button onClick={() => console.log("delete")}><DeleteForever /></Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default BtmTabelle;
