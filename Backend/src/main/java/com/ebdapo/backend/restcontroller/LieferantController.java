package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Lieferant;
import com.ebdapo.backend.entity.apidetails.LieferantAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.LieferantRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Bietet eine REST-Schnittstelle zur Verwaltung der Lieferanten an, die Dokumentation dazu kann
 * in der OpenAPI3 Datei gesehen werden
 */
@RestController
public class LieferantController {

    @Autowired private LieferantRepository lieferantRepo;
    @Autowired private ApothekenRepository apothekenRepo;
    @Autowired private AuthenticationController authController;

    @GetMapping("apotheke/{apothekeId}/lieferant")
    public ResponseEntity<?> getAll(@PathVariable String apothekeId) {
       if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getLieferanten(), HttpStatus.OK);
    }

    @PostMapping("apotheke/{apothekeId}/lieferant")
    public ResponseEntity<?> addLieferant(@PathVariable String apothekeId, @RequestBody LieferantAPIDetails lieferant) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Lieferant newLieferant = lieferantRepo.findLieferantByValues(apothekeId,
                lieferant.getName(),
                lieferant.getAnschrift().getStrasse(),
                lieferant.getAnschrift().getNummer(),
                lieferant.getAnschrift().getPlz(),
                lieferant.getAnschrift().getOrt());

        if(newLieferant == null) {
            newLieferant = new Lieferant();
            newLieferant.setApotheke(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));
            newLieferant.setAnschrift(lieferant.getAnschrift());
            newLieferant.getAnschrift().setId(UUID.randomUUID().toString());
            newLieferant.setName(lieferant.getName());
            newLieferant.setId(UUID.randomUUID().toString());
            lieferantRepo.save(newLieferant);
            return new ResponseEntity<>(newLieferant, HttpStatus.CREATED);
        }else {
            throw new InvalidInputException("Lieferant existiert bereits");
        }
    }

    @GetMapping("apotheke/{apothekeId}/lieferant/{lieferantId}")
    public ResponseEntity<?> getLieferant(@PathVariable String apothekeId, @PathVariable String lieferantId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Lieferant l =  lieferantRepo.findByIds(lieferantId, apothekeId);
        if(l == null){
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }
        return  new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PutMapping("apotheke/{apothekeId}/lieferant/{lieferantId}")
    public ResponseEntity<Lieferant> updateLieferant(@PathVariable String apothekeId, @PathVariable String lieferantId, @RequestBody LieferantAPIDetails newLiefer){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Lieferant found = lieferantRepo.findByIds(lieferantId, apothekeId);

        if(found == null) {
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }

        found.setName(newLiefer.getName());
        found.getAnschrift().setPlz(newLiefer.getAnschrift().getPlz());
        found.getAnschrift().setOrt(newLiefer.getAnschrift().getOrt());
        found.getAnschrift().setStrasse(newLiefer.getAnschrift().getStrasse());
        found.getAnschrift().setNummer(newLiefer.getAnschrift().getNummer());

        lieferantRepo.save(found);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("apotheke/{apothekeId}/lieferant/{lieferantId}")
    public ResponseEntity<?> deleteApotheke(@PathVariable String apothekeId, @PathVariable String lieferantId){
        Lieferant found = lieferantRepo.findByIds(lieferantId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }
        lieferantRepo.delete(found);
        return new ResponseEntity(HttpStatus.OK);
    }






}
