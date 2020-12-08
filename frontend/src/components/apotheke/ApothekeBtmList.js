import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import BuchungTabelle from "../btmbuch/BuchungTabelle";

export default function ApothekeBtmList(props) {
  const [btms, setBtms] = useState([]);

  const getBtms = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_BACKEND_HOSTNAME}/apotheke/${props.match.params.id}/btmbuchung`,
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
      console.log('response: ' , response);
      setBtms(await JSON.stringify(btms));
      // console.log('btms >>> nr. 1' + btms[0].buchungen);
      // console.log(JSON.stringify(btms));
    } else if (response.status === 403) {
      props.history.push("/forbidden");
    } else if (response.status === 400) {
      props.history.push("/badrequest");
    }
  };

  /**

 */

  //wird aufgerufen von NeuesBtmModal wenn ein neues BTM hinzugefügt wurde
  props.apothekeRefFunctions.updateBtmList = getBtms;

  useEffect(() => {
    getBtms();

  }, []);

  return (
    <div className="btm-buchung-wrapper">
      <FormControl
        id="searchBtmField"
        type="text"
        placeholder="Betäubungsmittel suchen"
      />
      {btms.map(btm =>
                <BuchungTabelle {...props} btm={btm} />
            )}
    </div>
  );
}

