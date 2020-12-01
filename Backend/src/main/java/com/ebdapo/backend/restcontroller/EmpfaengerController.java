package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Empfaenger;
import com.ebdapo.backend.entity.apidetails.EmpfaengerAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.EmpfaengerRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class EmpfaengerController {

    @Autowired
    EmpfaengerRepository empfaengerRepo;

    @Autowired
    ApothekenRepository apothekenRepo;

    @GetMapping("/apotheke/{apothekeId}/empfaenger")
    public List<Empfaenger> getAllEmpfaenger(@PathVariable String apothekeId){
        return apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getEmpfaenger();
    }

    @PostMapping("/apotheke/{apothekeId}/empfaenger")
    public ResponseEntity<Empfaenger> addEmpfaenger(@PathVariable String apothekeId, @RequestBody Empfaenger empf) {
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
    public ResponseEntity<Empfaenger> updateEmpfaenger(@PathVariable String apothekeId, @PathVariable String empfaengerId, @RequestBody EmpfaengerAPIDetails newEmpf){
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
    public ResponseEntity deleteEmpfaenger(@PathVariable String apothekeId, @PathVariable String empfaengerId) {
        Empfaenger found = empfaengerRepo.findByIds(empfaengerId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Empfaenger konnte nicht gefunden werden");
        }
        empfaengerRepo.delete(found);
        return new ResponseEntity(HttpStatus.OK);
    }

}
