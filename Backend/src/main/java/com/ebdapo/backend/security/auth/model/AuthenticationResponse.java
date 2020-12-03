package com.ebdapo.backend.security.auth.model;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;
    private String apothekeId;

    public AuthenticationResponse(String jwt, String apothekeId){
        this.jwt = jwt;
        this.apothekeId = apothekeId;
    }

}
