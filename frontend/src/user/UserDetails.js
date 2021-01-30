import React, {useState} from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { Settings } from '@material-ui/icons';
import UserDetailsUpdateModal from '../modals/UserDetailsUpdateModal';

function UserDetails(props) {
    //eslint disable-next-line
   const {rolle, nutzername, vorname, name } = props.user;
   const [showUserSettings, setShowUserSettings] = useState(false);

   var allRoles = {
       ADMIN : { 0: "Admin", 1 : "Pruefer", 2: "Benutzer"},
       PRUEFER : { 0 : "Pruefer", 1: "Benutzer"},
       BENUTZER : { 0: "Benutzer"}
   }

   const logout = () => {
       window.sessionStorage.removeItem("edbapo-jwt")
       props.history.push('/');
   }

   const getAktiveRolleVal = () => {
       let a = props.aktiveRolle.toLowerCase();
       a = a.charAt(0).toUpperCase() + a.slice(1);
       return a;
    }
    
    //aktive rolle kommt von Parent component und wird initial gesetzt
   const [aktiveRolleVal, setAktiveRolleVal] = useState(getAktiveRolleVal);

   //aktualisiert die aktuelle ausgewählte Rolle
   const updateAktiveRolleVal = data => {
    data = data.charAt(0).toUpperCase() + data.slice(1);
    setAktiveRolleVal(data);
   }

   return(
       <Row>
           <UserDetailsUpdateModal {...props} loggedInUser={props.user} show={showUserSettings} onHide={() => setShowUserSettings(false)}/>

           <Col>
                <Row><b>Eingeloggt als:</b></Row>
                <Row>{vorname} {name} ({nutzername})</Row> 
            </Col>
           <Col>
               <Form.Control 
                    as="select" 
                    value={aktiveRolleVal}
                    onChange={(event) => {props.setAktiveRolle(event.target.value.toUpperCase()); updateAktiveRolleVal(event.target.value)}}
                >
                   {Object.keys(allRoles[rolle]).map( role => <option key={allRoles[rolle][role]} value={allRoles[rolle][role]}>{allRoles[rolle][role]}</option>)}
               </Form.Control>
           </Col>
           <Col>
                <Button onClick={() => setShowUserSettings(true)}>
                    <Settings />
                    Einstellungen
                </Button>
           </Col>
           <Col>
               <Button onClick={logout}>Logout</Button>
           </Col>
       </Row>
   )
}

export default UserDetails;
