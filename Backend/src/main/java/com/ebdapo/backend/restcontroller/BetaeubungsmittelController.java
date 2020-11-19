package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.entity.Betaeubungsmittel;
import com.ebdapo.backend.entity.BetaeubungsmittelUpdateDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.BetaeubungsmittelRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class BetaeubungsmittelController {

    @Autowired
    BetaeubungsmittelRepository btmRepo;

    @Autowired
    ApothekenRepository apothekeRepo;

    @GetMapping("/apotheke/{apothekeId}/btm")
    public List<Betaeubungsmittel> getAllBtm(@PathVariable String apothekeId) {
        if(!apothekeRepo.existsById(apothekeId)){
            throw new BadRequestException("Apotheke existiert nicht");
        }
        return btmRepo.findBtmWithApothekenId(apothekeId);
    }

    @PostMapping("/apotheke/{apothekeId}/btm")
    public ResponseEntity<Betaeubungsmittel> createNewBtm(@PathVariable String apothekeId, @RequestBody Betaeubungsmittel btm) {
        btm.setApotheke(apothekeRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));

        if(checkIfAlreadyExists(btm)){
            throw new InvalidInputException("Betaeubungsmittel existiert bereits");
        }
        btm.setId(UUID.randomUUID().toString());
        btmRepo.save(btm);
        return new ResponseEntity<>(btm, HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public Betaeubungsmittel getBtmById(@PathVariable String btmId) {
        if(!btmRepo.existsById(btmId)){
            throw new InvalidInputException("Falsche ID");
        }
        return btmRepo.findById(btmId).get();
    }

    @PutMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity<Betaeubungsmittel> updateBtmById(@PathVariable String btmId, @RequestBody BetaeubungsmittelUpdateDetails newBtm) {
        if(!btmRepo.existsById(btmId)){
            throw new InvalidInputException("Falsche ID");
        }
        Betaeubungsmittel btm = btmRepo.findById(btmId).orElseThrow(InvalidInputException::new);
        try {
            if(newBtm.getApotheke() == null) {
                throw new InvalidInputException("ApothekenId darf nicht leer sein");
            }
            Apotheke apo = apothekeRepo.findById(newBtm.getApotheke()).orElseThrow(InvalidInputException::new);

            btm.setName(newBtm.getName());
            btm.setDarreichungsform(newBtm.getDarreichungsform());
            btm.setEinheit(newBtm.getEinheit());
            btm.setApotheke(apo);

            btmRepo.save(btm);
            return new ResponseEntity<>(btm, HttpStatus.OK);
        }catch(Exception e){
            throw new InvalidInputException();
        }
    }

    @DeleteMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity deleteBtm(@PathVariable String btmId){
        if(!btmRepo.existsById(btmId)) {
            throw new BadRequestException();
        }
        btmRepo.deleteById(btmId);
        return new ResponseEntity(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(Betaeubungsmittel btm) {
        return btmRepo.getBtmByValues(btm.getName(),
                btm.getDarreichungsform().toString(),
                btm.getEinheit().toString(),
                btm.getApotheke().getId()).size() > 0;
    }


}
