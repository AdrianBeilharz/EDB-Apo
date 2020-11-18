package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Benutzer;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.BenutzerRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class BenutzerController {

    @Autowired
    private BenutzerRepository benutzerRepo;

    @Autowired
    private ApothekenRepository apothekeRepo;

    @GetMapping("/apotheke/{apothekeId}/benutzer")
    public List<Benutzer> getAll(@PathVariable String apothekeId) {
        if(!apothekeRepo.existsById(apothekeId)){
            throw new BadRequestException("Benutzer existiert nicht");
        }
        return benutzerRepo.findBenutzerWithApothekeId(apothekeId);
    }

    @PostMapping("/apotheke/{apothekeId}/benutzer")
    public ResponseEntity createNewBenutzer(Benutzer benutzer) {
        if((benutzer.getId() != null && benutzerRepo.existsById(benutzer.getId())) ||
            checkIfUserExists(benutzer)) {
           throw new InvalidInputException("Benutzer existiert bereits");
        }
        benutzer.setId(UUID.randomUUID().toString());
        benutzerRepo.save(benutzer);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public Benutzer getBenutzerById(@PathVariable String benutzerId){
        if(!benutzerRepo.existsById(benutzerId)){
            throw new InvalidInputException("Falsche ID");
        }
        return benutzerRepo.findById(benutzerId).get();
    }

    @PutMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public ResponseEntity updateBenutzerById(@PathVariable String benutzerId, @RequestBody Benutzer newBenutzer){
        if(!benutzerRepo.existsById(benutzerId)){
            throw new InvalidInputException("Falsche ID");
        }
        benutzerRepo.findById(benutzerId).map(benutzer -> {
            try{
                benutzer.setName(newBenutzer.getName());
                benutzer.setVorname(newBenutzer.getVorname());
                benutzer.setPasswort(newBenutzer.getPasswort());
                benutzer.setRolle(newBenutzer.getRolle());
                benutzer.setApotheke(newBenutzer.getApotheke());

                benutzerRepo.save(benutzer);
                return new ResponseEntity(HttpStatus.OK);

            }catch(Exception e){
                e.printStackTrace();
                throw new InvalidInputException();
            }
        });
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/apotheke/{apothekeId}/benutzer/{benutzerId}")
    public ResponseEntity deleteUser(@PathVariable String benutzerId) {
        if(!benutzerRepo.existsById(benutzerId)) {
            throw new BadRequestException();
        }
        benutzerRepo.deleteById(benutzerId);
        return new ResponseEntity(HttpStatus.OK);
    }


    private boolean checkIfUserExists(Benutzer benutzer) {
        //check for username
        return false;
    }
}
