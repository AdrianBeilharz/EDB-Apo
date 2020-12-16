import React, {useState, useEffect} from 'react';
import { faEdit, faTrash, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Table, Button, Row, Col} from 'react-bootstrap';
import { Collapse } from '@material-ui/core';
import Moment from 'react-moment';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

import NeueBuchungModal from "./NeueBuchungModal";
import UpdateBuchungModal from '../../modals/UpdateBuchungModal';
import DeleteModal from '../../modals/DeleteModal';

function BuchungTabelle(props) {
  let { btm } = props;
  const { apoId } = useParams();

  const [dateClicked, setDateClicked]=useState(false)
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [showNewBuchungModal, setShowNewBuchungModal] = useState(false);
  const [showUpdateBuchungModal, setShowUpdateBuchungModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [lieferanten, setLieferanten] = useState([]);
    const [aerzte, setAerzte] = useState([]);
    const [empfaenger, setEmpfaenger] = useState([]);
    const [selectedBuchung, setSelectedBuchung] = useState({});

    
    const loadLieferanten = async () => {
      const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.apothekeId}/lieferant`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
          }
      }).catch((err) => {
          //SHOW ERROR
          console.log(err);
      });

      if (response.status === 200) {
          setLieferanten(await response.json());
          console.log(lieferanten);
      } else if (response.status === 403) {
          // props.history.push('/forbidden');
      } else if (response.status === 400) {
          // props.history.push('/badrequest');
      }
  }

  const loadAerzte = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.apothekeId}/arzt`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
        }
    }).catch((err) => {
        //SHOW ERROR
        console.log(err);
    });

    if (response.status === 200) {
        setAerzte(await response.json());
    } else if (response.status === 403) {
        // props.history.push('/forbidden');
    } else if (response.status === 400) {
        // props.history.push('/badrequest');
    }
}

  
  const loadEmpfaenger = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.apothekeId}/empfaenger`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
        }
    }).catch((err) => {
        //SHOW ERROR
        console.log(err);
    });

    if (response.status === 200) {
        setEmpfaenger(await response.json());
    } else if (response.status === 403) {
        // props.history.push('/forbidden');
    } else if (response.status === 400) {
        // props.history.push('/badrequest');
    }
}
    const update = buchung => {
      setSelectedBuchung(buchung);
      setShowUpdateBuchungModal(true);
  }

  const del = buchung => {
    setSelectedBuchung(buchung);
    setShowDeleteModal(true);
}

    const renderEditButtons = (buchung) => {
      return(
          <Row style={{display:'block'}}>
              <Button onClick={() => update(buchung)} style={{marginLeft:'0.5em'}}><FontAwesomeIcon icon={faEdit} /></Button>
              <Button onClick={() =>  del(buchung)} style={{marginLeft:'0.5em'}}><FontAwesomeIcon icon={faTrash} /></Button>
          </Row>
      )
  }

  
const renderPruefButton = () => {
  return (
      <Row style={{display:'block'}}>
          <Button onClick={() => setPruefDatum()} style={{marginLeft:'0.5em'}}>{dateClicked ? '' :<FontAwesomeIcon icon={faCheck} />}</Button>
      </Row>  
  )
}

const  setPruefDatum = () => {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  console.log(date);
}

  const deleteBtm = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung/${selectedBuchung.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
        },
    }).catch((err) => {
        //SHOW ERROR
        console.log(err);
    });

    if (response && response.status === 200) {
        props.apothekeRefFunctions.updateBtmList();
        enqueueSnackbar('Buchung erfolgreich gelöscht', { variant:'success', autoHideDuration: 3000} );
    } else {
        //SHOW ERROR
        console.log(response);
    }
}

useEffect(() => {
        loadLieferanten();
        loadAerzte();
        loadEmpfaenger();
     }, []);



  return (
    <React.Fragment>
      <NeueBuchungModal
        {...props} lieferanten={lieferanten} 
        aerzte={aerzte} empfaenger={empfaenger}
        buchung={selectedBuchung} show={showNewBuchungModal} onHide={() => setShowNewBuchungModal(false)}
      />
       <UpdateBuchungModal {...props} lieferanten={lieferanten}
                aerzte={aerzte}  empfaenger={empfaenger} 
                buchung={selectedBuchung} show={showUpdateBuchungModal} onHide={() => setShowUpdateBuchungModal(false)} />

      <DeleteModal {...props} headertext={'Betäubungsmittel-Buchung löschen'} 
                maintext={'Möchtest du diese Buchung wirklich löschen?'} onSubmit={deleteBtm} subtext={'Dieser Vorgang kann nicht rückgängig gemacht werden'} 
                show={showDeleteModal} onHide={() => setShowDeleteModal(false)} />

    
      <div style={{ marginBottom: "2em" }}>
      <Row onClick={() => setOpen(!open)} className="noselect btm-table-header-name">
                    <Col sm={3}><p >{btm.btm.name} ({btm.btm.menge})</p></Col>
                    <Col sm={9}>
                        <div style={{marginLeft:'-9em'}}>
                            <Button onClick={event => {event.stopPropagation(); setShowNewBuchungModal(true)}}>
                                Neue Buchung
                                <FontAwesomeIcon style={{marginLeft:'0.4em'}} icon={faPlus}/>
                            </Button>
                        </div>
                    </Col>
                </Row>
        <Collapse in={open}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Lieferant / Patient</th>
                <th>Arztpraxis</th>
                <th>Zugang</th>
                <th>Abgang</th>
                <th>Rezept Nr. / Lieferschein Nr.</th>
                <th>Prüfdatum</th>
                <th>Prüfer Kürzel</th>
                {props.aktiveRolle.toLowerCase() !== "pruefer" ? (<th></th> ) : null}
              </tr>
            </thead>
            <tbody>
              {btm.buchungen.map((buchung) => (
                <tr key={buchung.id}>
                  <td>
                    <Moment format="DD.MM.YYYY">{buchung.datum}</Moment>
                  </td>
                  <td>
                    {buchung.typ === "ZUGANG" ? buchung.lieferant.name : buchung.empfaenger.vorname + " " + buchung.empfaenger.name} </td>
                  <td>{buchung.typ === "ABGANG" ? buchung.arzt.name : ""}</td>
                  <td>{buchung.typ === "ZUGANG" ? buchung.menge : ""}</td>
                  <td>{buchung.typ === "ZUGANG" ? "" : buchung.menge}</td>
                  <td>
                    {buchung.typ === "ZUGANG" ? buchung.anforderungsschein : buchung.rezept}
                  </td>
                  <td>
                  {props.aktiveRolle.toLowerCase() === 'admin' ? <td style={{textAlign:'center', verticalAlign:'middle'}}>{renderPruefButton()}</td> : null}
                  </td>
                  <td></td>
                  {props.aktiveRolle.toLowerCase() === 'admin' ? <td style={{textAlign:'center', verticalAlign:'middle'}}>{renderEditButtons(buchung)}</td> : null}
                </tr>
              ))}
            </tbody>
          </Table>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

export default BuchungTabelle;
