import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Startseite extends Component{
	render() {
		return (
			<div class="row">
				<div class="col-6" >
				<form class="form-inline" >
					<input type="text" placeholder="Nutzername" />
					<input type="text" placeholder="Passwort" />
					<input type="submit" value="Einloggen" />
				</form>
				<Link to="/BTMBuch">Link</Link>
				</div>
				<div class="col-6" >
					<input type="button" value="Apotheke Registrieren" />
				</div>
			</div>
		)
	}
}

export default Startseite;
