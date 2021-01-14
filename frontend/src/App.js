import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Startseite from './components/startseite/Startseite';
import BTMBuch from './components/btmbuch/BTMBuch';
import ApothekeEinstellungen from './components/apotheke/einstellungen/ApothekeEinstellungen';
import Impressum from "./static/Impressum";
import Kontakt from "./static/Kontakt";
import { SnackbarProvider } from 'notistack';
require('dotenv').config()

function App() {
  return (
  <React.Fragment>
    <SnackbarProvider maxSnack={10} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
      <Router>
        <Switch>
          <Route path="/" exact component={Startseite} />
          <Route path="/login" exact component={Startseite} />
          <Route path="/apotheke/:apoId" exact component={BTMBuch} />
          <Route path="/apotheke/:apoId/einstellungen" exact component={ApothekeEinstellungen} />
          <Route path="/impressum" exact component={Impressum} />
          <Route path="/kontakt" exact component={Kontakt} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </React.Fragment>);
}

export default App;
