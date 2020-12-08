import React from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';

export default function UserDetails(props) {

const {rolle, vorname, name, nutzername, aktiv} = props.user;

var allRoles = {
    ADMIN: {0: 'Admin', 1: "Pruefer", 2: "Benutzer"},
    PRUEFER : { 0 : "Pruefer", 1: "Benutzer"},
    BENUTZER : { 0: "Benutzer"}
}

const logout = () => {
    window.sessionStorage.removeItem("edbapo-jwt")
    props.history.push('/')
}

    return (
        <Row>
            <Col><b>Nutzername: </b>{nutzername}</Col>
                <Form.Control as="select" onChange={(e) => {props.setAktivRolle(e.target.value.toUppercase())}}>
                {Object.keys(allRoles[rolle]).map( role => <option key={allRoles[rolle][role]} value={allRoles[rolle][role]}>{allRoles[rolle][role]}</option>)}
                </Form.Control>
            <Col><Button>Eistellungen</Button></Col>
            <Col><Button onClick={logout}></Button></Col>
        </Row>
    )
}
