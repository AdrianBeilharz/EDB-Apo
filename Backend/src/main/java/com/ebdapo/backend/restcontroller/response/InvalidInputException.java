package com.ebdapo.backend.restcontroller.response;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Diese Exception wird geworfen, wenn eine ungültige Anfrage des Clients gestellt wurde,
 * bei dem die Angaben falsch sind
 */
@NoArgsConstructor
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidInputException extends RuntimeException {

    public InvalidInputException(String msg){
        super(msg);
    }

}
