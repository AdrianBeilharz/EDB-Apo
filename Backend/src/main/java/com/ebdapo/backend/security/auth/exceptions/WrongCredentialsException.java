package com.ebdapo.backend.security.auth.exceptions;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class WrongCredentialsException extends Exception {

    public WrongCredentialsException(String msg) {
        super(msg);
    }
}
