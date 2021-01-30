import React from "react";
import './Headers.scss'

function StatusHeader(props) {

    // setzt die richtige style klasse für den hintergrund des status headers
  const checkRolle = (rolle) => {
      rolle = rolle.toLowerCase();

      if(rolle === 'admin'){
          return 'white-font red-background'
      }else if(rolle === 'pruefer'){
          return 'white-font yellow-background'
      }
      return ''
  }

  return(
      <div className={`${checkRolle(props.aktiveRolle)} status-header`}>
          Aktuelle Rolle: {props.aktiveRolle}
      </div>
  )
}
export default StatusHeader;
