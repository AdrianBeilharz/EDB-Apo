package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Betaeubungsmittel;
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

    @GetMapping("/apotheke/{apothekeId}/btm")
    public List<Betaeubungsmittel> getAllBtm(@PathVariable String apothekeId) {
        if(!btmRepo.existsById(apothekeId)){
            throw new BadRequestException("Betaeubungsmittel existiert nicht");
        }
        return btmRepo.findBtmWithApothekenId(apothekeId);
    }

    @PostMapping("/apotheke/{apothekeId}/btm")
    public ResponseEntity createNewBtm(@RequestBody Betaeubungsmittel btm) {
        if(checkIfAlreadyExists(btm)){
            throw new InvalidInputException("Betaeubungsmittel existiert bereits");
        }
        btm.setId(UUID.randomUUID().toString());
        btmRepo.save(btm);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public Betaeubungsmittel getBtmById(@PathVariable String btmId) {
        if(!btmRepo.existsById(btmId)){
            throw new InvalidInputException("Falsche ID");
        }
        return btmRepo.findById(btmId).get();
    }

    @PutMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity updateBtmById(@PathVariable String btmId, @RequestBody Betaeubungsmittel newBtm) {
        if(!btmRepo.existsById(btmId)){
            throw new InvalidInputException("Falsche ID");
        }
        btmRepo.findById(btmId).map(btm -> {
            try {
                btm.setName(newBtm.getName());
                btm.setDarreichungsform(newBtm.getDarreichungsform());
                btm.setEinheit(newBtm.getEinheit());
                btm.setApotheke(newBtm.getApotheke());

                btmRepo.save(btm);
                return new ResponseEntity(HttpStatus.OK);
            }catch(Exception e){
                e.printStackTrace();
                throw new InvalidInputException();
            }
        });
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/apotheke/{apothekeId}/btm/{btmId}")
    public ResponseEntity deleteBtm(@PathVariable String btmId){
        if(!btmRepo.existsById(btmId)) {
            throw new BadRequestException();
        }
        btmRepo.delete(btmRepo.findById(btmId).get());
        return new ResponseEntity(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(Betaeubungsmittel btm) {
       Betaeubungsmittel btmd = btmRepo.getBtmByValues(btm.getName(),
                btm.getDarreichungsform(),
                btm.getEinheit(),
                btm.getApotheke());
       System.out.println(btmd);
        return btmd != null;
    }


}
