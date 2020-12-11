package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.entity.Betaeubungsmittel;
import com.ebdapo.backend.entity.apidetails.BetaeubungsmittelAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.BetaeubungsmittelRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class BetaeubungsmittelController {

    @Autowired private BetaeubungsmittelRepository btmRepo;
    @Autowired private ApothekenRepository apothekeRepo;
    @Autowired private AuthenticationController authController;


    @GetMapping("/apotheke/{apothekeId}/btm")
    public ResponseEntity<?> getAllBtm(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getBetaeubungsmittel(), HttpStatus.OK);
    }

    @PostMapping("/apotheke/{apothekeId}/btm")
    public ResponseEntity<?> createNewBtm(@PathVariable String apothekeId, @RequestBody Betaeubungsmittel btm) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        btm.setApotheke(apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));

        if(checkIfAlreadyExists(btm)){
            throw new InvalidInputException("Betaeubungsmittel existiert bereits");
        }
        btm.setId(UUID.randomUUID().toString());
        btmRepo.save(btm);
        return new ResponseEntity<>(btm, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity<?> getBtmById(@PathVariable String apothekeId, @PathVariable String btmId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Betaeubungsmittel b =  btmRepo.findByIds(btmId, apothekeId);
        if(b == null){
            throw new InvalidInputException();
        }
        return new ResponseEntity<>(b, HttpStatus.OK);
    }

    @PutMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity<?> updateBtmById(@PathVariable String apothekeId, @PathVariable String btmId, @RequestBody BetaeubungsmittelAPIDetails newBtm) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Betaeubungsmittel btm = btmRepo.findByIds(btmId, apothekeId);
        if(btm == null){
            throw new InvalidInputException("Betaeubungsmittel konnte nicht gefunden werden");
        }

        Apotheke apo = apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new);

        btm.setName(newBtm.getName());
        btm.setDarreichungsform(newBtm.getDarreichungsform());
        btm.setEinheit(newBtm.getEinheit());
        btm.setApotheke(apo);

        btmRepo.save(btm);
        return new ResponseEntity<>(btm, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity<?> deleteBtm(@PathVariable String btmId){
        if(!btmRepo.existsById(btmId)) {
            throw new BadRequestException();
        }
        btmRepo.deleteById(btmId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(Betaeubungsmittel btm) {
        return btmRepo.getBtmByValues(btm.getName(),
                btm.getDarreichungsform().toString(),
                btm.getEinheit().toString(),
                btm.getApotheke().getId()).size() > 0;
    }


}
