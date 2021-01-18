import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function Kontakt() {
  return (
    <React.Fragment>
      <div className="header">
        <Row>
          <Col>
            <h1>
              <Link to={`/`} className="link">
                <h1>
                  <b>EDB-Apo</b>
                </h1>
              </Link>
            </h1>
          </Col>
          <Col>
            <div className="float-right" style={{ marginRight: "25%" }}></div>
          </Col>
        </Row>
      </div>
      <div style={{ position: "absolute", margin: "0 10%", top: "0" }}>
        <Row style={{ marginTop: "10em" }}>
          <Col>
            <h3>
              <b>Kontakt</b>
            </h3>
            <ul>
              <li>Hochschule Reutlingen / Reutlingen University</li>
              <li>Alteburgstraße 150</li>
              <li>72762 Reutlingen</li>
              <li>Deutschland / Germany</li>
            </ul>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Kontakt;
