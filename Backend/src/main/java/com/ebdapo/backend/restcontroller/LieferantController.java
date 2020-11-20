package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Lieferant;
import com.ebdapo.backend.entity.apidetails.LieferantAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.LieferantRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("apotheke/{apothekeId}")
public class LieferantController {

    @Autowired
    LieferantRepository lieferantRepo;

    @Autowired
    ApothekenRepository apothekenRepo;

    @GetMapping("/lieferant")
    public List<Lieferant> getAll(@PathVariable String apothekeId) {
        return apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getLieferanten();
    }

    @PostMapping("/lieferant")
    public ResponseEntity<Lieferant> addLieferant(@PathVariable String apothekeId, @RequestBody LieferantAPIDetails lieferant) {

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

    @GetMapping("/lieferant/{lieferantId}")
    public ResponseEntity<Lieferant> getLieferant(@PathVariable String apothekeId, @PathVariable String lieferantId) {
        Lieferant l =  lieferantRepo.findByIds(lieferantId, apothekeId);
        if(l == null){
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }
        return  new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PutMapping("/lieferant/{lieferantId}")
    public ResponseEntity<Lieferant> updateLieferant(@PathVariable String apothekeId, @PathVariable String lieferantId, @RequestBody LieferantAPIDetails newLiefer){
        Lieferant found = lieferantRepo.findByIds(lieferantId, apothekeId);

        if(found == null) {
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }

        found.setName(newLiefer.getName());
        if(newLiefer.getAnschrift() != null){
            found.getAnschrift().setNummer(newLiefer.getAnschrift().getNummer());
            found.getAnschrift().setOrt(newLiefer.getAnschrift().getOrt());
            found.getAnschrift().setPlz(newLiefer.getAnschrift().getPlz());
            found.getAnschrift().setStrasse(newLiefer.getAnschrift().getStrasse());
        }
        found.setApotheke(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));
        lieferantRepo.save(found);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("/lieferant/{lieferantId}")
    public ResponseEntity deleteApotheke(@PathVariable String apothekeId, @PathVariable String lieferantId){
        Lieferant found = lieferantRepo.findByIds(lieferantId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Lieferant konnte nicht gefunden werden");
        }
        lieferantRepo.delete(found);
        return new ResponseEntity(HttpStatus.OK);
    }

}
