import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BuchungTabelle from "../btmbuch/BuchungTabelle";

function ApothekeBtmList(props) {

  const { apoId } = useParams();
  const [btms, setBtms] = useState([]);
  const [input, setInput] = useState("");

  const getBtms = () => {
    fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${apoId}/btmbuchung`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    ).then(response => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 403) {
        props.history.push("/forbidden");
      } else if (response.status === 400) {
        props.history.push("/badrequest");
      }
    }).then(data => setBtms(data)).catch((err) => {
      //SHOW ERROR
      return;
    });

    
  };

  //wird aufgerufen von NeuesBtmModal wenn ein neues BTM hinzugefügt wurde
  props.apothekeRefFunctions.updateBtmList = getBtms;

  useEffect(getBtms, [apoId, props.history]);

  return (
    <div className="btm-buchung-wrapper">
      <input
        id="searchBtmField"
        type="text"
        placeholder="Betäubungsmittel suchen"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
      />
      {btms
        .filter((val) => {
          if (input === "") {
            return val;
          } else if (val.btm.name.toLowerCase().includes(input.toLowerCase())){
              return val;
          }
          return null;
        })
        .map((btm) => (
          <BuchungTabelle {...props} key={btm.id} btm={btm} />
        ))}
    </div>
  );
}

export default ApothekeBtmList;

