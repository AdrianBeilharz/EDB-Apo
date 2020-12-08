import React, { useState } from 'react';
import {Row, Col, Button, Form,} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import './Startseite.scss'


function Login(props) {
    const {handleSubmit} = useForm();
    const [user, setUser] = useState({username:'', password:''});
    
    const login = async event => {
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });


        if(response && response.status === 200){
            const data = await response.json();
            window.sessionStorage.setItem("edbapo-jwt", data.jwt)
            props.history.push(`/apotheke/${data.apothekeId}`);
        }
    }

    return (
        <div className="login">
            <b style={{fontSize:'20pt'}}>Login:</b>
            <Form onSubmit={handleSubmit(login)} >
                <Form.Row>
                    <Col>
                        <Form.Control onChange={e => setUser({...user, username: e.target.value})} placeholder="Benutzername" />
                        <Form.Control onChange={e => setUser({...user, password: e.target.value})} placeholder="Passwort" />
                        <Button variant="primary" type="submit">Login</Button>
                        <Button variant="primary" >Neue Apotheke registrieren</Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}
export default Login;