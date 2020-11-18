import React from 'react'

class Startseite extends React.Component{
	render() {
		return (
			<div class="row">
				<div class="col-6" >
				<form class="form-inline " >
					<input type="text" placeholder="Nutzername" />
					<input type="text" placeholder="Passwort" />
					<input type="submit" value="Einloggen" />
				</form>
				</div>
				<div class="col-6" >
					<input type="button" value="Apotheke Registrieren" />
				</div>
			</div>
		)
	}
}

export default Startseite;