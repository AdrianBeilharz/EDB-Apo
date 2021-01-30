import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Startseite from './components/startseite/Startseite';
import BTMBuch from './components/btmbuch/BTMBuch';
import ApothekeEinstellungen from './components/apotheke/einstellungen/ApothekeEinstellungen';
import Agb from "./static/Agb";
import Impressum from "./static/Impressum";
import Kontakt from "./static/Kontakt";
import { SnackbarProvider } from 'notistack';
import Forbidden from './static/Forbidden';
require('dotenv').config()

function App() {
  return (
  <React.Fragment>
    {/* Max Snack gibt an, wie viele Snackbars es maximal zur gleichen Zeit geben kann */}
    <SnackbarProvider maxSnack={10} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
      <Router>
        <Switch>
          {/* Hier werden alle Routen der Webseite angegeben und welche Components bei welcher Route gerendert werden */}
          <Route path="/" exact component={Startseite} />
          <Route path="/login" exact component={Startseite} />
          <Route path="/apotheke/:apoId" exact component={BTMBuch} />
          <Route path="/apotheke/:apoId/einstellungen" exact component={ApothekeEinstellungen} />
          <Route path="/agb" exact component={Agb} />
          <Route path="/impressum" exact component={Impressum} />
          <Route path="/kontakt" exact component={Kontakt} />
          <Route path="/forbidden" exact component={Forbidden} />
        </Switch>
      </Router>
    </SnackbarProvider>
  </React.Fragment>);
}

export default App;
