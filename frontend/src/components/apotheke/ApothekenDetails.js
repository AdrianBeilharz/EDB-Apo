import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../App.scss";

function ApothekeDetails(props) {
  const[apotheke, setApotheke] = useState({anschrift:{}});
  const[neuesBtmModalShow, setneuesBtmModalShow] = useState(false);


  const getApothekeData = async () => {
      const response = await fetch(`http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.match.params.id}`, {
          method: 'GET',
          headers: {
              'Authorization': 'Bearer ' + window.sessionStorage.getItem("edbapo-jwt"),
          }
      }).catch((err) => {
          //SHOW ERROR
          return;
      });

      if(response.status === 200){
          setApotheke(await response.json());
      }else if(response.status === 403) {
          props.history.push('/forbidden');
      }else if(response.status === 400){
          props.history.push('/badrequest');
      }
  }

  useEffect(() => {
      getApothekeData();
  }, [])

  return(
      <div>
          <ul>
              <li>Name: {apotheke.name}</li>
              <li>E-Mail: {apotheke.email}</li>            
          </ul>
          <Button>Apotheke Einstellungen</Button>
          <Button onClick={() => setneuesBtmModalShow(true)} style={{marginLeft:'1em'}}>Neues Betäubungsmittel anlegen</Button>         
      </div>
  )
}
export default ApothekeDetails;
