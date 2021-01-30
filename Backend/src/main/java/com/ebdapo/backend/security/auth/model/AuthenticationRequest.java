package com.ebdapo.backend.security.auth.model;

import lombok.Data;

/**
 * Diese Klasse repräsentiert die Authentifizierungsanfrage
 * Die Authentifizierungsanfrage beinhaltet den Nutzername und das Passwort
 */
@Data
public class AuthenticationRequest {

    private String username;
    private String password;

}
