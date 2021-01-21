import React, { useState, Fragment, useEffect } from 'react';
import { ListGroup, Button, Row, Col, FormControl} from 'react-bootstrap';
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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './ApothekeEinstellungen.scss'

function ApothekeEinstellungen(props) {
  const { apoId } = useParams()

  const [apotheke, setApotheke] = useState({ anschrift: {} })
  const [activeMenuItem, setActiveMenuItem] = useState('personal');
  const [loggedIn, setLoggedIn] = useState(false);
  const [aktiveRolle, setAktiveRolle] = useState(window.sessionStorage.getItem("aktive-rolle"));
  const [user, setUser] = useState({});
  const [showApothekeEditModal, setShowApothekeEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [personal, setPersonal] = useState([]);
  const [btms, setBtms] = useState([]);
  const [aerzte, setAerzte] = useState([]);
  const [lieferanten, setLieferanten] = useState([]);
  const [empfaenger, setEmpfaenger] = useState([]);

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

  // FETCHING DATA
  const getUserData = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));

    if (res.status === 200) {
      let data = await res.json()
      setUser(data);
      setLoggedIn(true)
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }
  }

  const getPersonalData = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/benutzer`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));
    
    if (res.status === 200) {
      let data = await res.json()
      setPersonal(data);
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }

  }

  const getBtmsData = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btm`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));

    if (res.status === 200) {
      let data = await res.json()
      setBtms(data);
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }
  }

  const getAerzteData = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/arzt`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));

    if (res.status === 200) {
      let data = await res.json()
      setAerzte(data);
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }
  }

  const getLieferantenData = async () => {
    const res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/lieferant`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));

    if (res.status === 200) {
      let data = await res.json()
      setLieferanten(data);
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }
  }
  
  const getEmpfaengerData = async () => {
    let res = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/empfaenger`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
      }
    }).catch(err => console.log(err));

    if (res.status === 200) {
      let data = await res.json()
      setEmpfaenger(data);
    } else if (res.status === 403) {
      props.history.push('forbidden');
    } else if (res.status === 400) {
      props.history.push('badrequest');
    }
  }

  //FILTERING THE DATA
  const filterPeronal = () => {
    let st = searchTerm.toLowerCase().replace(" ", "");
    return personal.filter(val => {
        let uname = val.nutzername.toLowerCase().replace(" ", "");
        let name = val.name.toLowerCase();
        let vorname = val.name.toLowerCase();
        let rolle = val.rolle.toLowerCase();
        if(searchTerm === ''){
            return val;
        } else if (uname.includes(st) || name.includes(st) || vorname.includes(st) || rolle.includes(st)){
            return val;
        }
    });
}

const filterBtms = () => {
    let st = searchTerm.toLowerCase().replace(" ", "");
    return btms.filter(val => {
        let name = val.name.toLowerCase();
        if(searchTerm === ''){
            return val;
        } else if (name.includes(st)){
            return val;
        }
    });
}

const filterAerzte = () => {
    let st = searchTerm.toLowerCase().replace(" ", "");
    return aerzte.filter(val => {
        let name = val.name.toLowerCase();
        let plz = val.anschrift.plz.toString();
        let ort = val.anschrift.ort.toLowerCase();
        let strasse = val.anschrift.strasse.toLowerCase();
        let nummer = val.anschrift.nummer.toString();
        if(searchTerm === ''){
            return val;
        } else if (name.includes(st) || plz.includes(st)  || ort.includes(st)  || strasse.includes(st)  || nummer.includes(st) ){
            return val;
        }
    });
}

const filterLieferanten = () => {
    let st = searchTerm.toLowerCase().replace(" ", "");
    return lieferanten.filter(val => {
        let name = val.name.toLowerCase();
        let plz = val.anschrift.plz.toString();
        let ort = val.anschrift.ort.toLowerCase();
        let strasse = val.anschrift.strasse.toLowerCase();
        let nummer = val.anschrift.nummer.toString();
        if(searchTerm === ''){
            return val;
        } else if (name.includes(st) || plz.includes(st)  || ort.includes(st)  || strasse.includes(st)  || nummer.includes(st) ){
            return val;
        }
    });
}

const filterEmpfaenger = () => {
  let st = searchTerm.toLowerCase().replace(" ", "");
  return empfaenger.filter(val => {
      let vorname = val.vorname.toLowerCase();
      let name = val.name.toLowerCase();
      let plz = val.anschrift.plz.toString();
      let ort = val.anschrift.ort.toLowerCase();
      let strasse = val.anschrift.strasse.toLowerCase();
      let nummer = val.anschrift.nummer.toString();
      if(searchTerm === ''){
          return val;
      } else if (name.includes(st) || vorname.includes(st) || plz.includes(st)  || ort.includes(st)  || strasse.includes(st)  || nummer.includes(st) ){
          return val;
      }
  });
}

  const renderContent = () => {
    if (activeMenuItem === 'personal') {
      let filtered = filterPeronal();
      return <PersonalTabelle {...props} updateUserList={getPersonalData} aktiveRolle={aktiveRolle} personal={filtered}/>;
    } else if (activeMenuItem === 'btm') {
      let filtered = filterBtms();
      return <BtmTabelle {...props} updateBtmList={getBtmsData} aktiveRolle={aktiveRolle} btms={filtered}/>;
    } else if (activeMenuItem === 'aerzte') {
      let filtered = filterAerzte();
      return <ArztTabelle {...props} updateAerzteList={getAerzteData} aktiveRolle={aktiveRolle} aerzte={filtered}/>
    } else if (activeMenuItem === 'lieferanten') {
      let filtered = filterLieferanten();
      return <LieferantTabelle {...props} updateLieferantenList={getLieferantenData} aktiveRolle={aktiveRolle} lieferanten={filtered}/>
    } else if (activeMenuItem === 'empfaenger') {
      let filtered = filterEmpfaenger();
      return <EmpfaengerTabelle {...props} updateEmpfaengerList={getEmpfaengerData} aktiveRolle={aktiveRolle} empfaenger={filtered}/>
    }
  }

  const updateAktiveRolle = data => {
    setAktiveRolle(data);
    window.sessionStorage.setItem("aktive-rolle", data);
  }

  useEffect(() => {
    getCurrentApotheke();
    getUserData();
    getPersonalData();
    getBtmsData();
    getAerzteData();
    getLieferantenData();
    getEmpfaengerData();
  }, [apoId, props.history]);

  return (
    <Fragment>
      <ApothekeEditModal {...props} show={showApothekeEditModal} onHide={() => setShowApothekeEditModal(false)} apotheke={apotheke} updateApothekeData={getCurrentApotheke} />
      {aktiveRolle && aktiveRolle.toLowerCase() !== 'benutzer' ? <StatusHeader aktiveRolle={aktiveRolle} /> : null}
      <Header />
      <Row className="details-list">
        <Col md={{ span: 1, offset: 1 }}><Button onClick={props.history.goBack}><ArrowBackIosIcon /> Zurück</Button></Col>

        <Col md={{ span: 6, offset: 4 }}>
          {loggedIn ? <UserDetails {...props} user={user} setUser={setUser} aktiveRolle={aktiveRolle} setAktiveRolle={updateAktiveRolle} /> : null}
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
            {aktiveRolle && aktiveRolle.toLowerCase() === 'admin' ? <Button onClick={() => setShowApothekeEditModal(true)}>Angaben bearbeiten</Button> : null}
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
          <FormControl id="searchField" style={{marginBottom:'1em', width:'80%'}} type="text" onChange={event => setSearchTerm(event.target.value) } placeholder="Suchen..."/>
            {user ? renderContent() : null}
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default ApothekeEinstellungen;
