package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Arzt;
import com.ebdapo.backend.entity.apidetails.ArztAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.ArztRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ArztController {

    @Autowired private ArztRepository arztRepo;
    @Autowired private ApothekenRepository apothekenRepo;
    @Autowired private AuthenticationController authController;



    @GetMapping("/apotheke/{apothekeId}/arzt")
    public ResponseEntity<?> getAllAerzte(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<Arzt> aerzte = apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getAerzte();
        return new ResponseEntity<>(aerzte, HttpStatus.OK);
    }

    @PostMapping("/apotheke/{apothekeId}/arzt")
    public ResponseEntity<?> addArzt(@PathVariable String apothekeId, @RequestBody ArztAPIDetails arzt) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Arzt newArzt = arztRepo.findArztByValues(apothekeId,
                arzt.getName(),
                arzt.getAnschrift().getStrasse(),
                arzt.getAnschrift().getNummer(),
                arzt.getAnschrift().getPlz(),
                arzt.getAnschrift().getOrt());

        if(newArzt == null) {
            newArzt = new Arzt();
            newArzt.setId(UUID.randomUUID().toString());
            newArzt.setApotheke(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));
            newArzt.setAnschrift(arzt.getAnschrift());
            newArzt.getAnschrift().setId(UUID.randomUUID().toString());
            newArzt.setName(arzt.getName());
            arztRepo.save(newArzt);
            return new ResponseEntity<>(newArzt, HttpStatus.CREATED);
        }else {
            throw new InvalidInputException("Arzt existiert bereits");
        }
    }

    @GetMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity<?> getArzt(@PathVariable String apothekeId, @PathVariable String arztId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Arzt l =  arztRepo.findByIds(arztId, apothekeId);
        if(l == null){
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }
        return  new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PutMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity<?> updateArzt(@PathVariable String apothekeId, @PathVariable String arztId, @RequestBody ArztAPIDetails arzt){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Arzt found = arztRepo.findByIds(arztId, apothekeId);

        if(found == null) {
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }
        found.setName(arzt.getName());

        found.getAnschrift().setPlz(arzt.getAnschrift().getPlz());
        found.getAnschrift().setOrt(arzt.getAnschrift().getOrt());
        found.getAnschrift().setStrasse(arzt.getAnschrift().getStrasse());
        found.getAnschrift().setNummer(arzt.getAnschrift().getNummer());

        arztRepo.save(found);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity<?> deleteApotheke(@PathVariable String apothekeId, @PathVariable String arztId){
        Arzt found = arztRepo.findByIds(arztId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }

        arztRepo.delete(found);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
