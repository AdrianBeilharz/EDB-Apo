SET FOREIGN_KEY_CHECKS=0;
DROP TABLE if exists abgang CASCADE;
DROP TABLE if exists adresse_t CASCADE;
DROP TABLE if exists apotheke CASCADE;
DROP TABLE if exists arzt CASCADE;
DROP TABLE if exists benutzer CASCADE;
DROP TABLE if exists btm CASCADE;
DROP TABLE if exists btm_buchung CASCADE;
DROP TABLE if exists empfaenger CASCADE;
DROP TABLE if exists lieferant CASCADE;
DROP TABLE if exists zugang CASCADE;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE adresse_t(
	id VARCHAR (40) NOT NULL,
	strasse VARCHAR (50) NOT NULL,
	nummer VARCHAR (50) NOT NULL,
	ort VARCHAR (50) NOT NULL,
	plz INTEGER NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE apotheke(
	id VARCHAR (40) NOT NULL,
	name VARCHAR (50) NOT NULL,
	email VARCHAR (50) NOT NUll,
	anschrift VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id)
);

CREATE TABLE btm(
	id VARCHAR (40) NOT NULL,
	name VARCHAR (50) NOT NULL,
	darreichungsform ENUM ('Tbl', 'Trp', 'Sup', 'RTA', 'RKA', 'Ampullen', 'Rezeptursubstanz', 'HKP', 'Pfl') NOT NULL,
	einheit ENUM('g','mg','ml', 'Stk.') NOT NULL,
	apotheke VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (apotheke) REFERENCES apotheke (id)
);

CREATE TABLE benutzer (
	id VARCHAR (40) NOT NULL,
	name VARCHAR (30) NOT NULL,
	vorname VARCHAR (30) NOT NULL,
	nutzername VARCHAR (30) NOT NULL,
	passwort VARCHAR (40) NOT NULL,
	rolle ENUM ('ADMIN', 'PRUEFER', 'BENUTZER') NOT NULL,
	apotheke VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (apotheke) REFERENCES apotheke (id)
);

CREATE TABLE lieferant (
	id VARCHAR (40) NOT NULL,
	name VARCHAR (30) NOT NULL,
	anschrift VARCHAR (40) NOT NULL,
	apotheke VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)
);

CREATE TABLE arzt (
	id VARCHAR (40) NOT NULL,
	name VARCHAR (30) NOT NULL,
	anschrift VARCHAR (40) NOT NULL,
	apotheke VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)
);

CREATE TABLE empfaenger (
	id VARCHAR (40) NOT NULL,
	name VARCHAR (30) NOT NULL,
	vorname VARCHAR (30) NOT NULL,
	anschrift VARCHAR (40) NOT NULL,
	apotheke VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (anschrift) REFERENCES adresse_t(id),
	FOREIGN KEY (apotheke) REFERENCES apotheke(id)
);

CREATE TABLE btm_buchung (
	id VARCHAR (40) NOT NULL,
	pruefdatum DATE NOT NULL,
	menge INTEGER NOT NULL,
	datum DATE  NOT NULL,
	btm VARCHAR (40) NOT NULL,
	benutzer VARCHAR (40) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (btm) REFERENCES btm (id),
	FOREIGN KEY (benutzer) REFERENCES benutzer (id)
);

CREATE TABLE zugang (
	btm_buchung VARCHAR (40) NOT NULL,
	anfordergungsschein VARCHAR (30) NOT NULL,
	lieferant VARCHAR (40) NOT NULL,
	PRIMARY KEY (btm_buchung),
	FOREIGN KEY (btm_buchung) REFERENCES btm_buchung (id),
	FOREIGN KEY (lieferant) REFERENCES lieferant (id)
);

CREATE TABLE abgang (
	btm_buchung VARCHAR (40) NOT NULL,
	empfaenger VARCHAR (40) NOT NULL,
	arzt VARCHAR (40) NOT NULL,
	rezept VARCHAR (30) NOT NULL,
	PRIMARY KEY (btm_buchung),
	FOREIGN KEY (btm_buchung) REFERENCES btm_buchung (id),
	FOREIGN KEY (empfaenger) REFERENCES empfaenger (id),
	FOREIGN KEY (arzt) REFERENCES arzt (id)
);

