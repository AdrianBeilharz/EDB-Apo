package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.repository.ArztRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArztController {

    @Autowired
    ArztRepository arztRepository;



}
