import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ApothekeDetails from './ApothekeDetails';
import BenutzerTable from './BenutzerTable';
import BTMTable from './BTMTable';
import AerzteTable from './AerzteTable';
import LieferantenTable from './LieferantenTable';

function Apotheke(props) {


  return (
    <div>
      <Row>
        <Col md={{ span: 2, offset: 1 }} >
          <ApothekeDetails />
        </Col>
        <Col md={{ span: 4, offset: 3 }}>
          <BenutzerTable />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <BTMTable />
        </Col>
        <Col md={4}>
          <AerzteTable />
        </Col>
        <Col md={4}>
          <LieferantenTable />
        </Col>
      </Row>
    </div>
  )
}

export default Apotheke;
