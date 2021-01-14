import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Kontakt() {
  return (
    <React.Fragment>
      <div className="header">
        <Row>
          <Col>
            <h1>
              <b>EDB</b>-Apo
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
