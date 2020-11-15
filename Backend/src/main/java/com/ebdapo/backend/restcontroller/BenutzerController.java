package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Benutzer;
import com.ebdapo.backend.repository.BenutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BenutzerController {

    @Autowired
    BenutzerRepository benutzerRepository;

    @GetMapping("benutzer")
    public List<Benutzer> getAll() {
        return benutzerRepository.findAll();
    }

}
