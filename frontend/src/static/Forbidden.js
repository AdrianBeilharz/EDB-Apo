import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./Static.scss";

function Forbidden(props) {
  return (
    <React.Fragment>
      <div className="header">
        <Row>
          <Col>
            <Link to={`/`} className="link">
              <h1>
                <b>EDB-Apo</b>
              </h1>
            </Link>
          </Col>
          <Col>
            <div className="float-right" style={{ marginRight: "25%" }}></div>
          </Col>
        </Row>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'3em'}}><h2>Zugriff verweigert</h2></div>
    </React.Fragment>
  );
}

export default Forbidden;
