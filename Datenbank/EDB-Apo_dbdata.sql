INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('1', 'Milchstrasse', '14a','Dresden', '01139' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('2', 'Hasenbergstrasse', '8','Dresden', '01139' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('3', 'Königstrasse', '56','Dresden', '01139' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('4', 'Apothekerstrasse', '23','Dresden', '01126' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('5', 'Honigstrasse', '1','Reutlingen', '72764' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('6', 'Hausstrasse', '24','Reutlingen', '72764' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('7', 'Echazstrasse', '65/1','Reutlingen', '54326' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('8', 'Honigstrasse', '5','Reutlingen', '72764' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('9', 'Hausstrasse', '16/1a','Reutlingen', '72764' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('10', 'Neckartalstrasse', '153','Stuttgart', '70376' );
INSERT INTO adresse_t(id, strasse, nummer, ort, plz) values ('11', 'Friozheimerstrasse', '7','Stuttgart', '70499' );

INSERT INTO apotheke(id, name, email, anschrift) values ('1', 'Löwen Apotheke','benutzer1@outlook.de', '1');
INSERT INTO apotheke(id, name, email, anschrift) values ('2', 'Dorf Apotheke', 'benutzer2@outlook.de', '2');
INSERT INTO apotheke(id, name, email, anschrift) values ('3', 'Hirsch Apotheke', 'benutzer3@outlook.de', '5');

INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('1', 'Capros Akut 20 mg', 'Tbl', 'Stueck', '1');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('2', 'Carehoxal 10mg', 'RTA', 'Stueck', '1');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('3', 'Dipidolor', 'Ampullen', 'Stueck', '1');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('4', 'Dronabinol 25mg/ml','Rezeptursubstanz','mg', '1');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('5', 'Elvanse 30 mg', 'HKP', 'Stueck', '1');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('6', 'Fentanyl-Hexal Pfl 37,5 ug/Std.', 'Pfl', 'Stueck', '2');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('7', 'Carehoxal 10mg', 'RTA', 'Stueck', '2');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('8', 'Dipidolor', 'Ampullen', 'Stueck', '2');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('9', 'Equasim Ret. 20mg', 'HKP', 'Stueck', '2');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('10','Elvanse 30 mg' ,'HKP', 'Stueck', '2');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('11', 'Oxycodon/Nalox Beta 10/5', 'RTA', 'Stueck', '3');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('12', 'Oxycodon/Nalox 20/10 mg Beta', 'RTA', 'Stueck', '3');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('13', 'Oxiconoica 10 mg', 'RTA', 'Stueck', '3');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('14', 'Dipidolor', 'Ampullen', 'Stueck', '3');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('15', 'Palexia', 'RTA', 'Stueck', '3');
INSERT INTO btm(id,name, darreichungsform, einheit,apotheke) values ('16','Elvanse 30 mg','HKP', 'Stueck', '3');

INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('1', 'Heller', 'Helga', 'nutzername1', '123_abcd', 'ADMIN', true, '1');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('2', 'Kurz', 'Martin', 'benutzername2', '123_zbgvf', 'Pruefer', true, '1');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('3', 'Stegmiller', 'Hans', 'benutzername3', '1_zbgvf', 'Benutzer', true, '1');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('4', 'Voteler', 'Jana', 'benutzername4', '12xx_zbgvf', 'Benutzer', true, '1');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('5', 'Voigt', 'Michael', 'benutzername5', '123_abcd', 'ADMIN', true, '2');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('6', 'Lasten', 'Klara', 'benutzername6', '123_zbgvf', 'Pruefer', true, '2');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('7', 'Müller', 'Jan', 'benutzername7', '1_zbgvf', 'Benutzer', true,'2');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('8', 'Wolle', 'Maria', 'benutzername7', '12xx_zbgvf', 'Benutzer', true, '2');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('9', 'Miller', 'Karl', 'benutzername8', '123_abcs', 'ADMIN', true,'3');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('10', 'Last', 'Heinz', 'benutzername9', '123_zbgvf', 'Pruefer', true, '3');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('11', 'Maly', 'Jana', 'benutzername10', '1_zbtvf', 'Benutzer', true, '3');
INSERT INTO benutzer(id , name, vorname, nutzername, passwort, rolle, aktiv, apotheke) values ('12', 'Wolle', 'Maria', 'benutzername11', '12xx_zbgvf', 'Benutzer', true, '3');

INSERT INTO lieferant (id, name, anschrift, apotheke) values ('1', 'GEHE', '10', '1');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('2', 'GEHE', '10', '1');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('3', 'GEHE', '10', '1');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('4', 'Alliance Healthcare GmbH', '11', '2');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('5', 'Alliance Healthcare GmbH', '11', '2');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('6', 'Alliance Healthcare GmbH', '11', '2');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('7', 'Noweda','1', '3');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('8', 'Noweda','1', '3');
INSERT INTO lieferant (id, name, anschrift, apotheke) values ('9', 'Noweda','1', '3');

INSERT INTO arzt (id, name, anschrift, apotheke) value ('1', 'Dr. Krause', '6', '1');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('2', 'Dr. Michellmann', '7', '1');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('3', 'Dr. Fink', '8', '2');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('4', 'Dr. Nübel', '9', '2');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('5', 'Dr. Krause', '6', '2');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('6', 'Dr. Herz', '7', '3');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('7', 'Dr. Merz', '8', '3');
INSERT INTO arzt (id, name, anschrift, apotheke) value ('8', 'Dr. Haus', '9', '3');

INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('1', 'Lang', 'Heinz', '6', '1');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('2', 'Herzlieb', 'Karl', '7', '1');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('3', 'Lange', 'Annemarie', '8', '2');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('4', 'Klasse', 'Maria', '9', '2');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('5', 'Hut', 'Lena', '6', '2');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('6', 'Renner', 'Leonardo', '7', '3');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('7', 'Master', 'Rudolf', '8', '3');
INSERT INTO empfaenger (id, name, vorname, anschrift, apotheke) value ('8', 'Hase', 'Mike', '9', '3');

INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('1', '2020-11-10', '100',  '2020-11-01', '1', '3');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('2', '2020-10-03', '20',  '2020-10-01', '2', '3');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('3', '2020-09-10', '20',  '2020-09-09', '2', '3');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('4', '2020-09-03', '5',  '2020-09-01', '3', '3');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('5', '2020-11-10', '5',  '2020-11-01', '7', '7');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('6', '2020-10-03', '10',  '2020-10-01', '7', '7');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('7', '2020-10-10', '20',  '2020-10-05', '8', '7');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('8', '2020-10-03', '60',  '2020-10-01', '8', '7');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('9', '2020-11-10', '5',  '2020-11-01', '13', '12');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('10', '2020-09-03', '10',  '2020-09-01', '14', '12');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('11', '2020-09-25', '5',  '2020-09-23', '15', '12');
INSERT INTO btm_buchung(id, pruefdatum, menge, datum, btm, benutzer) value ('12', '2020-09-25', '20',  '2020-09-22', '16', '12');

INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('1', '63671547', '1');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('2', '65571547', '1');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('3', '63688479', '2');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('4', '65571993', '3');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('5', '63678548', '1');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('6', '65571547', '1');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('7', '63688471', '2');
INSERT INTO zugang (btm_buchung, anfordergungsschein, lieferant) value ('8', '65571997', '3');

INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('1', '1', '2', '636715473');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('2', '1', '3', '655715475');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('3', '2', '4', '636884795');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('4', '2', '5', '655719937');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('5', '3', '6', '636785489');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('6', '4', '7', '655715476');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('7', '5', '8', '636884716');
INSERT INTO abgang (btm_buchung, empfaenger, arzt, rezept) value ('8', '7', '8', '655719972');

