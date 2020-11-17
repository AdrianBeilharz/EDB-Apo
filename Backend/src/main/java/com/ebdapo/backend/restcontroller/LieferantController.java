package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.repository.LieferantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LieferantController {

    @Autowired
    LieferantRepository lieferantRepository;

}
