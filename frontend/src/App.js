import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Startseite from './components/startseite/Startseite';
import Impressum from './static/Impressum'
import BTMBuch from './components/btmbuch/BTMBuch'
import Apotheke from './components/apotheke/Apotheke'

library.add(fab, faCheckSquare, faBookMedical)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon size="3x" icon={faBookMedical}/>
        <h1>EDB-Apo</h1>
      </header>
      <div class="container" >
        <Router>
          <Switch>
            {/* Components */}
            <Route path="/" exact component={Startseite} />
            <Route path="/btmbuch" exact component={BTMBuch} />
            <Route path="/btmbuch/apotheke" exact component={Apotheke} />
            {/* Static pages */}
            <Route path="/impressum" component={Impressum} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
