package com.ebdapo.backend.security.auth.model;

import lombok.Data;

/**
 * Nach dem Login wird diese Antwort an den Client zurückgesendet,
 * die Antwort beinhaltet den Token und die Apotheken Id des Nutzers
 */
@Data
public class AuthenticationResponse {

    private String jwt;
    private String apothekeId;

    public AuthenticationResponse(String jwt, String apothekeId){
        this.jwt = jwt;
        this.apothekeId = apothekeId;
    }

}
