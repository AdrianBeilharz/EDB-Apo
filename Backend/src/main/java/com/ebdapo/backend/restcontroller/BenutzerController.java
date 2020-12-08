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

import java.util.HashMap;
import java.util.UUID;

@RestController
public class BenutzerController {

    @Autowired private BenutzerRepository benutzerRepo;
    @Autowired private ApothekenRepository apothekeRepo;
    @Autowired private AuthenticationController authController;


    @GetMapping("/benutzer/me")
    public ResponseEntity<?> getUserData() {
        try {
            Benutzer b = benutzerRepo.getBenutzerByUsername(authController.getCurrentUsername());
            HashMap<String, String> data = new HashMap<>();
            data.put("id", b.getId());
            data.put("nutzername", b.getNutzername());
            data.put("name", b.getName());
            data.put("vorname", b.getVorname());
            data.put("aktiv", Boolean.toString(b.isAktiv()));
            data.put("rolle", b.getRolle().toString());
            return new ResponseEntity<>(data, HttpStatus.OK);
        }catch(Exception e){
            throw new InvalidInputException();
        }
    }


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

        String nutzername = benutzer.getNutzername();
        String name = benutzer.getName();
        String vorname = benutzer.getVorname();
        String passwort = benutzer.getPasswort();

        if(nutzername == null || benutzer.getApotheke() == null || vorname == null || name == null ||
                passwort == null || benutzer.getRolle() == null){
           throw new InvalidInputException("Ungültige oder fehlende Angaben");
        }else if(nutzername.length() < 4 ||vorname.length() < 1 || name.length() < 1 || passwort.length() < 5) {
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
        String authorized = authController.checkIfAuthorizedAndSameUserOrAdmin(authController.getCurrentUsername(), apothekeId, benutzerId);
        if(authorized == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!benutzerRepo.existsById(benutzerId)){
            throw new InvalidInputException("Falsche ID");
        }


        Benutzer benutzer = benutzerRepo.findById(benutzerId).orElseThrow(InvalidInputException::new);
        boolean reqFromAdmin = authorized.equals("admin");

        //checks if the user is authorized to change it (entering valid password)
        String pw = newBenutzer.getOldPassword() ;

        if(!reqFromAdmin){
            if(pw != null && !pw.isBlank()){
                if(!new BCryptPasswordEncoder().matches(pw, benutzer.getPasswort())) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }
            }else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        }

        Apotheke apo = apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);
        benutzer.setName(newBenutzer.getName());
        benutzer.setNutzername(newBenutzer.getNutzername());
        benutzer.setVorname(newBenutzer.getVorname());

        //Nur Admin kann aktiv oder inaktiv setzen
        if(reqFromAdmin){
            benutzer.setAktiv(newBenutzer.isAktiv());
        }
        //nur admin kann Rolle ändern
        if(reqFromAdmin && newBenutzer.getRolle() != null){
            benutzer.setRolle(newBenutzer.getRolle());
        }

        if(newBenutzer.getNewPassword() != null){
            benutzer.setPasswort(new BCryptPasswordEncoder().encode(newBenutzer.getNewPassword()));
        }

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

    @PostMapping("/apotheke/{apothekeId}/benutzer/{username}/checkUsername")
    public ResponseEntity<?> checkIfUsernameTagenUsername(@PathVariable String apothekeId, @PathVariable String username) {

        if (username.length() >= 4 && benutzerRepo.getBenutzerByUsername(username) == null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    private boolean checkIfUserExists(Benutzer benutzer) {
        return benutzerRepo.getBenutzerByUsername(benutzer.getNutzername()) != null;
    }
}
