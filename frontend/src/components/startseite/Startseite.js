import React from 'react';
import Login from './Login'
import Header from '../headers/Header'

function Startseite(props) {
    return(
        <React.Fragment>
            <Header/>
            <Login {...props}/>
        </React.Fragment>
    )
}

export default Startseite;
