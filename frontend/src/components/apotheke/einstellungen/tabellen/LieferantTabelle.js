import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';

function LieferantTabelle(props) {
  const { id } = useParams();
  const [lieferanten, setLieferanten] = useState([]);

  const getPersonalData = async () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${id}/lieferant`, {
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

  useEffect(() => {
    getPersonalData()
  }, [])

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Strasse</th>
            <th>Ort</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {lieferanten.map(lieferant =>
            <tr key={lieferant.id}>
              <td>{lieferant.name}</td>
              <td>{lieferant.anschrift.strasse} {lieferant.anschrift.nummer}</td>
              <td>{lieferant.anschrift.plz} {lieferant.anschrift.ort}</td>
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

export default LieferantTabelle;
