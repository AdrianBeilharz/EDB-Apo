package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.repository.ApothekenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApothekenController {

    @Autowired
    ApothekenRepository apothekenRepository;
    
    @GetMapping("apotheke")
    public List<Apotheke> getAll() {
        return apothekenRepository.findAll();
    }
    
}
