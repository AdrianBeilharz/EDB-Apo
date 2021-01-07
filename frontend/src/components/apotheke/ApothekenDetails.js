import React, { useEffect, useState } from "react";
import { Link, useParams  } from 'react-router-dom';
import { Button } from "react-bootstrap";
import NeuesBtmModal from "../btmbuch/NeuesBtmModal";
import "../../App.scss";

function ApothekenDetails(props) {
  const { apoId } = useParams();
  const [apotheke, setApotheke] = useState({ anschrift: {} });
  const [neuesBtmModalShow, setneuesBtmModalShow] = useState(false);

  const getApothekeData = () => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    ).then(response => {
      if (response.status === 200) {
        setApotheke(response.json());
      } else if (response.status === 403) {
        props.history.push("/forbidden");
      } else if (response.status === 400) {
        props.history.push("/badrequest");
      }
    }).catch((err) => {
      //SHOW ERROR
      return;
    });

    
  };

  useEffect(getApothekeData, [apoId, props.history]);

  return (
    <div className="apo-details">
      <ul>
        <li>Name: {apotheke.name}</li>
        <li>E-Mail: {apotheke.email}</li>
      </ul>
      <Link to={`${props.match.params.apoId}/einstellungen`} ><Button >Apotheke Einstellungen</Button></Link>
      <Button
        onClick={() => setneuesBtmModalShow(true)}
        style={{ marginLeft: "1em" }}
      >
        Neues Betäubungsmittel anlegen
      </Button>
      <NeuesBtmModal
        show={neuesBtmModalShow}
        {...props}
        onHide={() => setneuesBtmModalShow(false)}
      />
    </div>
  );
}
export default ApothekenDetails;
