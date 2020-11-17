package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.BetaeubungsmittelBuchung;
import com.ebdapo.backend.repository.BetaeubungsmittelBuchungRepository;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class BetaeubungsmittelBuchungController {

    @Autowired
    BetaeubungsmittelBuchungRepository btmBuchungRepo;

    @GetMapping("/apotheke/{apothekeId}/btmbuchung")
    public List<BetaeubungsmittelBuchung> getAllBtm(@PathVariable String apothekeId) {
        if(!btmBuchungRepo.existsById(apothekeId)){
            throw new BadRequestException("Betaeubungsmittel-Buchung existiert nicht");
        }
        return btmBuchungRepo.findBtmWithApothekenId(apothekeId);
    }

    @PostMapping("/apotheke/{apothekeId}/btmbuchung")
    public ResponseEntity createNewBtm(@RequestBody BetaeubungsmittelBuchung btmb) {
        if(checkIfAlreadyExists(btmb)){
            throw new InvalidInputException("Betaeubungsmittel-Buchung existiert bereits");
        }
        btmb.setId(UUID.randomUUID().toString());

        try{
            btmBuchungRepo.save(btmb);
        }catch(Exception e){
            e.printStackTrace();
            throw new InvalidInputException("Objekt falsches Format");
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public BetaeubungsmittelBuchung getBtmById(@PathVariable String btmbuchungId) {
        if(!btmBuchungRepo.existsById(btmbuchungId)){
            throw new InvalidInputException("Falsche ID");
        }
        return btmBuchungRepo.findById(btmbuchungId).get();
    }

    @PutMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity updateBtmById(@PathVariable String btmbuchungId, @RequestBody BetaeubungsmittelBuchung newBtmBuchung) {
        if(!btmBuchungRepo.existsById(btmbuchungId)){
            throw new InvalidInputException("Falsche ID");
        }
        btmBuchungRepo.findById(btmbuchungId).map(btmBuchung -> {
            try {
                btmBuchung.setPruefdatum(newBtmBuchung.getPruefdatum());
                btmBuchung.setMenge(newBtmBuchung.getMenge());
                btmBuchung.setDatum(newBtmBuchung.getDatum());
                btmBuchung.setBtm(newBtmBuchung.getBtm());
                btmBuchung.setBenutzer(newBtmBuchung.getBenutzer());

                btmBuchungRepo.save(btmBuchung);
                return new ResponseEntity(HttpStatus.OK);
            }catch(Exception e){
                e.printStackTrace();
                throw new InvalidInputException();
            }
        });
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity deleteBtm(@PathVariable String btmbuchungId){
        if(!btmBuchungRepo.existsById(btmbuchungId)) {
            throw new BadRequestException();
        }
        btmBuchungRepo.deleteById(btmbuchungId);
        return new ResponseEntity(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(BetaeubungsmittelBuchung btmBuchung) {
        return btmBuchungRepo.getBtmBuchungByValues(btmBuchung.getPruefdatum(),
                btmBuchung.getMenge(),
                btmBuchung.getDatum(),
                btmBuchung.getBtm().getId(),
                btmBuchung.getBenutzer().getId()) != null;
    }

}
