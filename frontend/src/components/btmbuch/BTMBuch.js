import React, { useState, useEffect } from 'react';
import Header from '../headers/Header'
import StatusHeader from '../headers/StatusHeader'
import ApothekenDetails from '../apotheke/ApothekenDetails';
import UserDetails from '../../user/UserDetails';
import ApothekeBtmList from '../apotheke/ApothekeBtmList';
import {Row, Col} from 'react-bootstrap';
 
function BTMBuch (props) {
  let paths = props.location.pathname.split("/");

  const [apothekeId, setApothekeId] = useState(paths[paths.length-1])
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [aktiveRolle, setAktiveRolle] = useState('');

  const getUserDetails = async event => {
      const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/benutzer/me`, {
          method: 'GET',
          headers: {
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
          }
      }).catch((err) => {
          //SHOW ERROR
          return;
      });

      if(response.status === 200) {
          let u = await response.json();
          console.log(JSON.stringify(u))
          setUser(u);
          setAktiveRolle(u.rolle);
          setLoggedIn(true);
      }else if(response.status === 403) {
          props.history.push('/forbidden');
      }else if(response.status === 400){
          props.history.push('/badrequest');
      }
  }

  useEffect(() => {
      getUserDetails();
  }, [])

  //this obj is passed to each child, each child can add functions to this object and call functions from this object
  let apothekeRefFunctions = {}
  
  return(
      <React.Fragment>
          {aktiveRolle.toLowerCase() !== 'benutzer' ?<StatusHeader aktiveRolle={aktiveRolle}/> : null}
          <Header />
          <Row className="details-list">
              <Col><ApothekenDetails {...props} apothekeRefFunctions={apothekeRefFunctions} apothekeId={apothekeId}/></Col>
              <Col>{isLoggedIn ? <UserDetails {...props} user={user} aktiveRolle={aktiveRolle} setAktiveRolle={setAktiveRolle}/> : null }</Col>
          </Row> 
           
      </React.Fragment>
  )
}

export default BTMBuch;
