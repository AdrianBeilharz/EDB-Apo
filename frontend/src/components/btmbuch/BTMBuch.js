import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../headers/Header'
import StatusHeader from '../headers/StatusHeader'
import ApothekenDetails from '../apotheke/ApothekenDetails';
import UserDetails from '../../user/UserDetails';
import ApothekeBtmList from '../apotheke/ApothekeBtmList';
import { Row, Col } from 'react-bootstrap';
import './BTMBuch.scss'

function BTMBuch(props) {
  const { apoId } = useParams();

  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [aktiveRolle, setAktiveRolle] = useState(window.sessionStorage.getItem("aktive-rolle"));

  const getUserDetails = event => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        props.history.push('/forbidden');
      } else if (response.status === 400) {
        props.history.push('/badrequest');
      }
    }).then(data => {
      setUser(data);
      console.log(aktiveRolle)
      if(!aktiveRolle) {
        setAktiveRolle(data.rolle);
        window.sessionStorage.setItem("aktive-rolle", data.rolle);
      }
      setLoggedIn(true);
    }).catch((err) => {
      //SHOW ERROR
      return;
    });
  }

  const updateAktiveRolle = data => {
    setAktiveRolle(data);
    window.sessionStorage.setItem("aktive-rolle", data);
  }

  useEffect(getUserDetails, [apoId, props.history, aktiveRolle])
  useEffect(() => {
    setAktiveRolle(window.sessionStorage.getItem("aktive-rolle"));
  }, [])

  //this obj is passed to each child, each child can add functions to this object and call functions from this object
  let apothekeRefFunctions = {}

  return (
    <React.Fragment>
      {aktiveRolle && aktiveRolle.toLowerCase() !== 'benutzer' ? <StatusHeader aktiveRolle={aktiveRolle} /> : null}
      <Header />
      <Row className="details-list">
        <Col><ApothekenDetails {...props} apothekeRefFunctions={apothekeRefFunctions} apothekeId={apoId} /></Col>
        <Col>{isLoggedIn ? <UserDetails {...props} user={user} setUser={setUser} aktiveRolle={aktiveRolle} setAktiveRolle={updateAktiveRolle} /> : null}</Col>
      </Row>
      <ApothekeBtmList apothekeId={apoId} user={user} apothekeRefFunctions={apothekeRefFunctions} {...props} aktiveRolle={aktiveRolle} />
    </React.Fragment>
  )
}

export default BTMBuch;
