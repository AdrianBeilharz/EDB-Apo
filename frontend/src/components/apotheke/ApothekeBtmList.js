import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import BuchungTabelle from "../btmbuch/BuchungTabelle";

function ApothekeBtmList(props) {
  const [btms, setBtms] = useState([]);
  const [input, setInput] = useState("");

  const getBtms = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_URL}/apotheke/${props.match.params.id}/btmbuchung`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("edbapo-jwt"),
        },
      }
    ).catch((err) => {
      //SHOW ERROR
      return;
    });

    if (response.status === 200) {
      setBtms(await response.json());
    } else if (response.status === 403) {
      props.history.push("/forbidden");
    } else if (response.status === 400) {
      props.history.push("/badrequest");
    }
  };

  //wird aufgerufen von NeuesBtmModal wenn ein neues BTM hinzugefügt wurde
  props.apothekeRefFunctions.updateBtmList = getBtms;

  useEffect(() => {
    getBtms();
  }, []);

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
            console.log("namen der Liste", val.btm.name);
            return val;
          } else if (val.btm.name.toLowerCase().includes(input.toLowerCase())){
              return val;
          }
        })
        .map((btm, key) => (
          <BuchungTabelle {...props} btm={btm} />
        ))}
    </div>
  );
}

export default ApothekeBtmList;

/*{btms.map(btm => <BuchungTabelle {...props} btm={btm} /> )}*/
