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
    ApothekenRepository apothekenRepo;

    @GetMapping("/apotheke")
    public List<Apotheke> getAll() {
        return apothekenRepo.findAll();
    }

    @PostMapping("/apotheke")
    public ResponseEntity<Apotheke> newApotheke(@RequestBody Apotheke apotheke) {
        if(apotheke.getName() == null || apotheke.getEmail() == null || apotheke.getAnschrift() == null) {
            throw new InvalidInputException("Ungültige oder fehlende Angaben");
        }

        if(checkIfAlreadyExists(apotheke)){
            throw new InvalidInputException("Apotheke existiert bereits");
        }
        apotheke.getAnschrift().setId(UUID.randomUUID().toString());
        apotheke.setId(UUID.randomUUID().toString());
//        adresseRespo.save(apotheke.getAnschrift());
        apothekenRepo.save(apotheke);
        return new ResponseEntity<>(apotheke, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}")
    public Apotheke getAll(@PathVariable String apothekeId) {
        return apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);
    }

    @PutMapping("/apotheke/{apothekeId}")
    public ResponseEntity<Apotheke> updateApotheke(@PathVariable String apothekeId, @RequestBody Apotheke newApo) {
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
       //apo.setBenutzer(newApo.getBenutzer());
       //apo.setAerzte(newApo.getAerzte());
       //apo.setLieferanten(newApo.getLieferanten());
       //apo.setEmpfaenger(newApo.getEmpfaenger());
       //adresseRespo.save(apo.getAnschrift());
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
