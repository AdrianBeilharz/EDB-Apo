package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Empfaenger;
import com.ebdapo.backend.entity.apidetails.EmpfaengerAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.EmpfaengerRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Bietet eine REST-Schnittstelle zur Verwaltung der Empfänger an, die Dokumentation dazu kann
 * in der OpenAPI3 Datei gesehen werden
 */
@RestController
public class EmpfaengerController {

    @Autowired private EmpfaengerRepository empfaengerRepo;
    @Autowired private ApothekenRepository apothekenRepo;
    @Autowired private AuthenticationController authController;

    @GetMapping("/apotheke/{apothekeId}/empfaenger")
    public ResponseEntity<?> getAllEmpfaenger(@PathVariable String apothekeId){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getEmpfaenger(), HttpStatus.OK);
    }

    @PostMapping("/apotheke/{apothekeId}/empfaenger")
    public ResponseEntity<?> addEmpfaenger(@PathVariable String apothekeId, @RequestBody Empfaenger empf) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Empfaenger newEmpf = empfaengerRepo.findEmpfaengerByValues(apothekeId,
                empf.getName(),
                empf.getVorname(),
                empf.getAnschrift().getStrasse(),
                empf.getAnschrift().getNummer(),
                empf.getAnschrift().getPlz(),
                empf.getAnschrift().getOrt());

        if(newEmpf == null) {
            newEmpf = new Empfaenger();
            newEmpf.setId(UUID.randomUUID().toString());
            newEmpf.setVorname(empf.getVorname());
            newEmpf.setName(empf.getName());
            newEmpf.setAnschrift(empf.getAnschrift());
            newEmpf.getAnschrift().setId(UUID.randomUUID().toString());
            newEmpf.setApotheke(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));
            empfaengerRepo.save(newEmpf);
            return new ResponseEntity<>(newEmpf, HttpStatus.CREATED);
        }else {
            throw new InvalidInputException("Empfaenger existiert bereits");
        }
    }


    @PutMapping("/apotheke/{apothekeId}/empfaenger/{empfaengerId}")
    public ResponseEntity<?> updateEmpfaenger(@PathVariable String apothekeId, @PathVariable String empfaengerId, @RequestBody EmpfaengerAPIDetails newEmpf){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Empfaenger found = empfaengerRepo.findByIds(empfaengerId, apothekeId);

        if(found == null){
            throw new InvalidInputException("Empfaenger konnte nicht gefunden werden");
        }

        if(newEmpf.getApotheke() == null || newEmpf.getApotheke().isEmpty()){
            throw new InvalidInputException("ApothekenId darf nicht leer sein");
        }

        found.setName(newEmpf.getName());
        found.setVorname(newEmpf.getVorname());

        found.getAnschrift().setPlz(newEmpf.getAnschrift().getPlz());
        found.getAnschrift().setOrt(newEmpf.getAnschrift().getOrt());
        found.getAnschrift().setStrasse(newEmpf.getAnschrift().getStrasse());
        found.getAnschrift().setNummer(newEmpf.getAnschrift().getNummer());

        found.setApotheke(apothekenRepo.findById(newEmpf.getApotheke()).orElseThrow(InvalidInputException::new));

        empfaengerRepo.save(found);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}/empfaenger/{empfaengerId}")
    public ResponseEntity<?> deleteEmpfaenger(@PathVariable String apothekeId, @PathVariable String empfaengerId) {
        Empfaenger found = empfaengerRepo.findByIds(empfaengerId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Empfaenger konnte nicht gefunden werden");
        }
        empfaengerRepo.delete(found);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
