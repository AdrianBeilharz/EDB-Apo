package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.entity.Benutzer;
import com.ebdapo.backend.entity.apidetails.BenutzerAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.BenutzerRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class BenutzerController {

    @Autowired private BenutzerRepository benutzerRepo;
    @Autowired private ApothekenRepository apothekeRepo;
    @Autowired private AuthenticationController authController;


    @GetMapping("/apotheke/{apothekeId}/benutzer")
    public ResponseEntity<?> getAll(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!apothekeRepo.existsById(apothekeId)){
            throw new BadRequestException("Apotheke existiert nicht");
        }
        return new ResponseEntity<>(benutzerRepo.findBenutzerWithApothekeId(apothekeId), HttpStatus.OK);
    }

    @PostMapping("/apotheke/{apothekeId}/benutzer")
    public ResponseEntity<?> createNewBenutzer(@PathVariable String apothekeId, @RequestBody Benutzer benutzer) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        benutzer.setApotheke(apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));

        if(benutzer.getNutzername() == null || benutzer.getApotheke() == null || benutzer.getVorname() == null ||
                benutzer.getName() == null || benutzer.getPasswort() == null || benutzer.getRolle() == null){
           throw new InvalidInputException("Ungültige oder fehlende Angaben");
        }

        if(checkIfUserExists(benutzer)) {
           throw new InvalidInputException("Benutzer existiert bereits");
        }

        benutzer.setId(UUID.randomUUID().toString());
        benutzer.setPasswort(new BCryptPasswordEncoder().encode(benutzer.getPasswort()));
        benutzer.setAktiv(true);
        benutzerRepo.save(benutzer);
        return new ResponseEntity<>(benutzer, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public ResponseEntity<?> getBenutzerById(@PathVariable String apothekeId, @PathVariable String benutzerId){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(benutzerRepo.findById(benutzerId).orElseThrow(InvalidInputException::new), HttpStatus.OK);
    }

    @PutMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public ResponseEntity<?> updateBenutzerById(@PathVariable String apothekeId, @PathVariable String benutzerId, @RequestBody BenutzerAPIDetails newBenutzer){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!benutzerRepo.existsById(benutzerId)){
            throw new InvalidInputException("Falsche ID");
        }
        Benutzer benutzer = benutzerRepo.findById(benutzerId).orElseThrow(InvalidInputException::new);
        if(newBenutzer.getApotheke() == null){
            throw new InvalidInputException("ApothekenId darf nicht leer sein");
        }
        Apotheke apo = apothekeRepo.findById(newBenutzer.getApotheke()).orElseThrow(InvalidInputException::new);
        benutzer.setName(newBenutzer.getName());
        benutzer.setNutzername(newBenutzer.getNutzername());
        benutzer.setVorname(newBenutzer.getVorname());
        benutzer.setPasswort(new BCryptPasswordEncoder().encode(newBenutzer.getPasswort()));
        benutzer.setAktiv(newBenutzer.isAktiv());
        benutzer.setRolle(newBenutzer.getRolle());
        benutzer.setApotheke(apo);

        benutzerRepo.save(benutzer);
        return new ResponseEntity<>(benutzer, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public ResponseEntity<?> deleteUser(@PathVariable String apothekeId, @PathVariable String benutzerId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!benutzerRepo.existsById(benutzerId)) {
            throw new BadRequestException();
        }
        benutzerRepo.deleteById(benutzerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private boolean checkIfUserExists(Benutzer benutzer) {
        return benutzerRepo.getBenutzerByUsername(benutzer.getNutzername()) != null;
    }
}
