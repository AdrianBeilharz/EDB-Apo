CREATE TABLE adresse_t(
	id INTEGER NOT NULL AUTO_INCREMENT,
	strasse VARCHAR (50) NOT NULL,
	nummer INTEGER NOT NULL,
	ort VARCHAR (50) NOT NULL,
	plz INTEGER NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE apotheke(
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (50) NOT NULL,
	anschrift INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id)
);

CREATE TABLE btm(
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (50) NOT NULL,
	pzn VARCHAR (15) NOT NULL,
	darreichungsform ENUM('Tabletten', 'Tropfen', 'Zaepfchen') NOT NULL,
	staerke VARCHAR (10) NOT NULL,
	packungsgroesse INTEGER NOT NULL,
	einheit ENUM('g','mg','ml', 'Stueck') NOT NULL,
	apotheke INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (apotheke) REFERENCES apotheke (id)	
);

CREATE TABLE benutzer (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	passwort VARCHAR (40) NOT NULL,
	rolle ENUM ('ADMIN', 'Pruefer', 'Benutzer') NOT NULL, 
	apotheke INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (apotheke) REFERENCES apotheke (id)
);

CREATE TABLE lieferant (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	anschrift INTEGER NOT NULL,
	apotheke INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)	
);

CREATE TABLE arzt (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	anschrift INTEGER NOT NULL,
	apotheke INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)	
);

CREATE TABLE empfaenger (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR (30) NOT NULL,
	anschrift INTEGER NOT NULL,
	apotheke INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)	
);

CREATE TABLE btm_buchung (
	id INTEGER NOT NULL AUTO_INCREMENT,
	pruefdatum DATE NOT NULL,
	menge INTEGER NOT NULL,
	datum DATE  NOT NULL,
	btm INTEGER NOT NULL,
	benutzer INTEGER NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (btm) REFERENCES btm (id),
	FOREIGN KEY (benutzer) REFERENCES benutzer (id)		
);

CREATE TABLE zugang (
	btm_buchung INTEGER NOT NULL,
	anfordergungsschein VARCHAR (30) NOT NULL,
	lieferant INTEGER NOT NULL,
	PRIMARY KEY (btm_buchung),
	FOREIGN KEY (btm_buchung) REFERENCES btm_buchung (id),
	FOREIGN KEY (lieferant) REFERENCES lieferant (id)
);

CREATE TABLE abgang (
	btm_buchung INTEGER NOT NULL,
	empfaenger INTEGER NOT NULL,
	arzt INTEGER NOT NULL,
	rezept VARCHAR (30) NOT NULL,
	PRIMARY KEY (btm_buchung),
	FOREIGN KEY (btm_buchung) REFERENCES btm_buchung (id),
	FOREIGN KEY (empfaenger) REFERENCES empfaenger (id),
	FOREIGN KEY (arzt) REFERENCES arzt (id)
);

