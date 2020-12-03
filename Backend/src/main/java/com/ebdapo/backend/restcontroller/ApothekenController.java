package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ApothekenController {

    @Autowired private ApothekenRepository apothekenRepo;
    @Autowired private AuthenticationController authController;


    @GetMapping("/apotheke")
    public List<?> getAll() {
        return apothekenRepo.findAll();
    }

    @PostMapping("/apotheke")
    public ResponseEntity<?> newApotheke(@RequestBody Apotheke apotheke) {
        if(apotheke.getName() == null || apotheke.getEmail() == null || apotheke.getAnschrift() == null) {
            throw new InvalidInputException("Ungültige oder fehlende Angaben");
        }

        if(checkIfAlreadyExists(apotheke)){
            throw new InvalidInputException("Apotheke existiert bereits");
        }
        apotheke.getAnschrift().setId(UUID.randomUUID().toString());
        apotheke.setId(UUID.randomUUID().toString());
        apothekenRepo.save(apotheke);
        return new ResponseEntity<>(apotheke, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}")
    public ResponseEntity<?> getAll(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Apotheke apo = apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);
        return new ResponseEntity<>(apo, HttpStatus.OK);
    }


    @PutMapping("/apotheke/{apothekeId}")
    public ResponseEntity<?> updateApotheke(@PathVariable String apothekeId, @RequestBody Apotheke newApo) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Apotheke apo = apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);
        apo.setName(newApo.getName());
        if(newApo.getAnschrift() != null){
            apo.getAnschrift().setNummer(newApo.getAnschrift().getNummer());
            apo.getAnschrift().setOrt(newApo.getAnschrift().getOrt());
            apo.getAnschrift().setPlz(newApo.getAnschrift().getPlz());
            apo.getAnschrift().setStrasse(newApo.getAnschrift().getStrasse());
        }else {
            throw new InvalidInputException("Anschrift ist notwendig");
        }
        apothekenRepo.save(apo);
        return new ResponseEntity<>(apo, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}")
    public ResponseEntity<?> deleteApotheke(@PathVariable String apothekeId) {
        if(!apothekenRepo.existsById(apothekeId)) {
            throw new BadRequestException();
        }
        apothekenRepo.deleteById(apothekeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private boolean checkIfAlreadyExists(Apotheke apotheke) {
        return apothekenRepo.getApothekeByValues(apotheke.getName(),
                apotheke.getAnschrift().getStrasse(),
                apotheke.getAnschrift().getNummer(),
                apotheke.getAnschrift().getOrt(),
                apotheke.getAnschrift().getPlz()) != null;
    }

}
