import React, { useState, Fragment, useEffect } from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Header from '../../headers/Header';
import StatusHeader from '../../headers/StatusHeader';
import UserDetails from '../../../user/UserDetails';
import ArztTabelle from './tabellen/ArztTabelle';
import BtmTabelle from './tabellen/BtmTabelle';
import LieferantTabelle from './tabellen/LieferantTabelle';
import PersonalTabelle from './tabellen/PersonalTabelle';
import EmpfaengerTabelle from './tabellen/EmpfaengerTabelle';
import ApothekeEditModal from '../../../modals/ApothekeEditModal';

import './ApothekeEinstellungen.scss'

function ApothekeEinstellungen(props) {
  const { apoId } = useParams()

  const [apotheke, setApotheke] = useState({ anschrift: {} })
  const [activeMenuItem, setActiveMenuItem] = useState('personal');
  const [loggedIn, setLoggedIn] = useState(false);
  const [aktiveRolle, setAktiveRolle] = useState('');
  const [user, setUser] = useState({});
  const [showApothekeEditModal, setShowApothekeEditModal] = useState(false);


  const getCurrentApotheke = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt")
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else if (res.status === 403) {
        props.history.push('forbidden');
      } else if (res.status === 400) {
        props.history.push('badrequest');
      }
    }).then((data) => setApotheke(data))
      .catch((err) => {
        //SHOW ERROR
        return;
      })
  }

  const getUserData = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else if (res.status === 403) {
          props.history.push('forbidden');
        } else if (res.status === 400) {
          props.history.push('badrequest');
        }
      }).then((data) => {
        setUser(data);
        setAktiveRolle(data.rolle)
        setLoggedIn(true)
      }).catch((err) => {
        //SHOW ERROR
        return;
      });
  }


  const renderContent = () => {
    if (activeMenuItem === 'personal') {
      return <PersonalTabelle {...props} />;
    } else if (activeMenuItem === 'btm') {
      return <BtmTabelle {...props} />;
    } else if (activeMenuItem === 'aerzte') {
      return <ArztTabelle {...props} />
    } else if (activeMenuItem === 'lieferanten') {
      return <LieferantTabelle {...props} />
    } else if (activeMenuItem === 'empfaenger') {
      return <EmpfaengerTabelle {...props} aktiveRolle={aktiveRolle} />
    }
  }

  useEffect(() => {
    getUserData();
    getCurrentApotheke();
  }, []);

  return (
    <Fragment>
      <ApothekeEditModal {...props} show={showApothekeEditModal} onHide={() => setShowApothekeEditModal(false)} apotheke={apotheke} updateApothekeData={getCurrentApotheke} />
      {aktiveRolle.toLowerCase() !== 'benutzer' ? <StatusHeader aktiveRolle={aktiveRolle} /> : null}
      <Header />
      <Row className="details-list">
        <Col md={{ span: 6, offset: 6 }}>
          {loggedIn ? <UserDetails {...props} user={user} setUser={setUser} aktiveRolle={aktiveRolle} setAktiveRolle={setAktiveRolle} /> : null}
        </Col>
      </Row>
      <div className="main-content">
        <Row>
          <Col sm={4}>
            <ul>
              <li>Name: {apotheke.name}</li>
              <li>E-Mail: {apotheke.email}</li>
              <li>Anschrift: {apotheke.anschrift.strasse} {apotheke.anschrift.nummer}  ({apotheke.anschrift.plz} {apotheke.anschrift.ort})</li>
            </ul>
            <Button onClick={() => setShowApothekeEditModal(true)}>Angaben bearbeiten</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '3em' }}>
          <Col sm={3}>
            <ListGroup as="ul" className="menu-list">
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('personal')} active={activeMenuItem === 'personal'}>Pharmazeutisches Personal</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('btm')} active={activeMenuItem === 'btm'}>Betäubungsmittel</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('aerzte')} active={activeMenuItem === 'aerzte'}>Ärzte</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('lieferanten')} active={activeMenuItem === 'lieferanten'}>Lieferanten</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('empfaenger')} active={activeMenuItem === 'empfaenger'}>Empfänger</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            {user ? renderContent() : null}
          </Col>
        </Row>
      </div>


    </Fragment>
  )
}

export default ApothekeEinstellungen;
