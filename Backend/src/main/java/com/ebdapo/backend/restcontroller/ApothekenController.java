package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ApothekenController {

    @Autowired
    private ApothekenRepository apothekenRepo;

    @GetMapping("/apotheke")
    public List<Apotheke> getAll() {
        return apothekenRepo.findAll();
    }

    @PostMapping("/apotheke")
    public ResponseEntity<Apotheke> newApotheke(@RequestBody Apotheke apotheke) {
        if(checkIfAlreadyExists(apotheke)){
            throw new InvalidInputException("Apotheke existiert bereits");
        }
        apotheke.setId(UUID.randomUUID().toString());
        apothekenRepo.save(apotheke);
        return new ResponseEntity<>(apotheke, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}")
    public Apotheke getAll(@PathVariable String apothekeId) {
        if(!apothekenRepo.existsById(apothekeId)){
            throw new InvalidInputException("Falsche ID");
        }
        return apothekenRepo.findById(apothekeId).get();
    }

    @PutMapping("/apotheke/{apothekeId}")
    public ResponseEntity<Apotheke> updateApotheke(@PathVariable String apothekeId, @RequestBody Apotheke newApo) {
        Apotheke apo = apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);

        apo.setName(newApo.getName());
        apo.setAnschrift(newApo.getAnschrift());
        apo.setBenutzer(newApo.getBenutzer());
        apo.setAerzte(newApo.getAerzte());
        apo.setLieferanten(newApo.getLieferanten());
        apo.setEmpfaenger(newApo.getEmpfaenger());
        apothekenRepo.save(apo);
        return new ResponseEntity<>(apo, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}")
    public ResponseEntity deleteApotheke(@PathVariable String apothekeId){
        if(!apothekenRepo.existsById(apothekeId)) {
            throw new BadRequestException();
        }
        apothekenRepo.deleteById(apothekeId);
        return new ResponseEntity(HttpStatus.OK);
    }


    private boolean checkIfAlreadyExists(Apotheke apotheke) {
        return apothekenRepo.getApothekeByValues(apotheke.getName(),
                apotheke.getAnschrift().getStrasse(),
                apotheke.getAnschrift().getNummer(),
                apotheke.getAnschrift().getOrt(),
                apotheke.getAnschrift().getPlz()) != null;
    }

}
