package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.repository.EmpfaengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmpfaengerController {

    @Autowired
    EmpfaengerRepository empfaengerRepository;

}
