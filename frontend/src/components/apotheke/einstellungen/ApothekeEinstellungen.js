import React, { useState, Fragment, useEffect } from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Header from '../../headers/Header';
import StatusHeader from '../../headers/StatusHeader';
import ArztTabelle from './tabellen/ArztTabelle';
import BtmTabelle from './tabellen/BtmTabelle';
import LieferantTabelle from './tabellen/LieferantTabelle';
import PersonalTabelle from './tabellen/PersonalTabelle';

import './ApothekeEinstellungen.scss'

function ApothekeEinstellungen(props) {
  const { id } = useParams()

  const [apotheke, setApotheke] = useState({ anschrift: {} })
  const [activeMenuItem, setActiveMenuItem] = useState('personal');
  const [user, setUser] = useState(null);


  const getCurrentApotheke = async () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${id}`, {
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

  const getUserData = async () => {
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
      }).then(data => setUser(data)
      ).catch((err) => {
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
    }
  }

  useEffect(() => {
    getUserData();
    getCurrentApotheke();
  }, []);

  return (
    <Fragment>
      <StatusHeader aktiveRolle="admin" />
      <Header />
      <div className="main-content">
        <Row>
          <Col sm={4}>
            <ul>
              <li>Name: {apotheke.name}</li>
              <li>E-Mail: {apotheke.email}</li>
              <li>Anschrift: {apotheke.anschrift.strasse} {apotheke.anschrift.nummer}  ({apotheke.anschrift.plz} {apotheke.anschrift.ort})</li>
            </ul>
            <Button>Angaben bearbeiten</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '3em' }}>
          <Col sm={3}>
            <ListGroup as="ul" className="menu-list">
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('personal')} active={activeMenuItem === 'personal'}>Pharmazeutisches Personal</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('btm')} active={activeMenuItem === 'btm'}>Betäubungsmittel</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('aerzte')} active={activeMenuItem === 'aerzte'}>Ärzte</ListGroup.Item>
              <ListGroup.Item as="li" onClick={() => setActiveMenuItem('lieferanten')} active={activeMenuItem === 'lieferanten'}>Lieferanten</ListGroup.Item>
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
