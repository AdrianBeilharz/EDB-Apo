import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';

import Startseite from './components/startseite/Startseite';
import BTMBuch from './components/btmbuch/BTMBuch';
import Apotheke from './components/apotheke/Apotheke';
import Impressum from './static/Impressum';

library.add(fab, faCheckSquare, faBookMedical)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon size="3x" icon={faBookMedical}/>
        <h1>EDB-Apo</h1>
      </header>
      <Container fluid>
        <Router>
          <Switch>
            {/* Components */}
            <Route path="/" exact component={Startseite} />
            <Route path="/btmbuch" exact component={BTMBuch} />
            <Route path="/apotheke" exact component={Apotheke} />
            {/* Static pages */}
            <Route path="/impressum" exact component={Impressum} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
