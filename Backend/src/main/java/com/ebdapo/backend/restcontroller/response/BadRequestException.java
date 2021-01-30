package com.ebdapo.backend.restcontroller.response;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Diese Exception wird geworfen, wenn eine ungültige Anfrage des Clients gestellt wurde
 */
@NoArgsConstructor
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

    public BadRequestException(String msg) {
        super(msg);
    }
}
