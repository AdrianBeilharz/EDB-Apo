import React, {useState} from 'react';
import { Row, Col, Button} from 'react-bootstrap';
import Login from '../startseite/Login';
import './Headers.scss'

function Header(props) {

    const renderLoginButton = () => {
        return(
            <Button onClick={() => props.setShowLoginForm(true)}>Login</Button>
        )
    }

    const renderLoginForm = () => {
        return(
            <React.Fragment>
                <div className="arrow-up"></div>
                <div className="login-form" > 
                    <Login hideLoginForm={props.setShowLoginForm} {...props}/>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div className="header">
            <Row>
                <Col>
                    <h1><b>EDB</b>-Apo</h1>
                </Col>
                <Col>
                    <div className="float-right" style={{marginRight:'25%'}}>
                        {props.showLoginButton ? renderLoginButton() : null}
                        {props.showLoginForm ? renderLoginForm(): null}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Header;
