import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Edit, DeleteForever } from '@material-ui/icons';
import { Table, Button } from 'react-bootstrap';

function PersonalTabelle(props) {
  const { id } = useParams();
  const [personal, setPersonal] = useState([]);

  const getPersonalData = async () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${id}/benutzer`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
        }
    }).then((res) => {
      if(res.status === 200) {
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

  useEffect(() => {
    getPersonalData()
  }, [])

  return (
    <Fragment>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nutzername</th>
            <th>Nachname</th>
            <th>Vorname</th>
            <th>Aktiv</th>
            <th>Rolle</th>
            <th>Aktionen</th>
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
              <td>
                <Button onClick={() => console.log("update")}><Edit /></Button>
                <Button onClick={() =>  console.log("delete")}><DeleteForever /></Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default PersonalTabelle;
