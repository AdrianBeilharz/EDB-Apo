import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import './Static.scss';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Agb(props) {
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
      <div style={{ position: "absolute", margin: "0 10%", top: "0" }}>
        <Row style={{ marginTop: "10em" }}>
          <Col>
            <h3>
              <b>AGB</b>
            </h3>
            <ul>
              <li>AGBs folgen ...</li>
            </ul>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <p>
            Diese Anwendung enstand als Projektarbeit im E-Health Kurs des
            MKI-Studiengangs der Hochschule Reutlingen.
            <br />
            Hochschule Reutlingen, Alteburgstraße 150, 72762 Reutlingen
          </p>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Agb;
