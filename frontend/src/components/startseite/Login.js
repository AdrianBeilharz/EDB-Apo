import React, { useEffect, useRef } from 'react';
import {Col, Button, Form,} from 'react-bootstrap';
import { useSnackbar } from 'notistack';
import '../../App.scss';
import './Startseite.scss'


function Login(props) {
    const { enqueueSnackbar } = useSnackbar();

    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            props.hideLoginForm(false);
        }
    };

    const handleClickInside = () => props.hideLoginForm(true);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    
    const login = async event => {
        event.preventDefault();
        let {username, password} = event.target;
        let body = {username: username.value, password: password.value};
        const response = await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).catch((err) => {
            //SHOW ERROR
            console.log(err);
        });


        if(response && response.status === 200){
            const data = await response.json();
            window.sessionStorage.setItem("edbapo-jwt", data.jwt)
            props.history.push(`/apotheke/${data.apothekeId}`);
        } else {
            enqueueSnackbar("Nutzername oder Passwort ist Falsch", {variant: "error", autoHideDuration: 3000, anchorOrigin: {vertical: 'bottom', horizontal: 'left'}});
        }
    }

    return (
        <div ref={myRef} onClick={handleClickInside} className="login">
            <b style={{fontSize:'20pt'}}>Login</b>
            <Form onSubmit={login} >
                <Form.Row>
                    <Col>
                        <Form.Control autoFocus name="username" placeholder="Benutzername" required />
                        <Form.Control name="password" placeholder="Passwort" type="password" required />
                        <Button variant="primary" type="submit">Login</Button>    
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}
export default Login;
