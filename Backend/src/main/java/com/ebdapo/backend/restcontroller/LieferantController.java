package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Lieferant;
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
    LieferantRepository lieferantRepository;

    @GetMapping("/lieferant")
    public List<Lieferant> getAll() {
        return lieferantRepository.findAll();
    }

    @PostMapping("/lieferant")
    public ResponseEntity<Lieferant> addLieferant(@RequestBody Lieferant lieferant) {
        if(checkIfAlreadyExists(lieferant)){
            throw new InvalidInputException("Apotheke existiert bereits");
        }
        lieferant.setId(UUID.randomUUID().toString());
        lieferantRepository.save(lieferant);
        return new ResponseEntity<>(lieferant, HttpStatus.CREATED);
    }

    @GetMapping("/lieferant/{lieferantId}")
    public Lieferant getLieferant(@PathVariable("lieferantId") String lieferantId) {
        if(!lieferantRepository.existsById(lieferantId)){
            throw new InvalidInputException("Falsche ID");
        }
        return lieferantRepository.findById(lieferantId).get();

    }

    @PutMapping("/lieferant/{lieferantId}")
    public ResponseEntity<Lieferant> updateLieferant(@PathVariable String lieferantId, @RequestBody Lieferant lieferant){
        Lieferant dbLieferant = lieferantRepository.findById(lieferantId)
                    .orElseThrow(() -> new InvalidInputException("Falsche ID"));
        dbLieferant.setName(lieferant.getName());
        dbLieferant.setAnschrift(lieferant.getAnschrift());
        dbLieferant.setApotheke(lieferant.getApotheke());
        lieferantRepository.save(dbLieferant);
        return new ResponseEntity(dbLieferant, HttpStatus.OK );
    }

    /**
    @DeleteMapping("/lieferant/{lieferantId}")
    public ResponseEntity deleteLieferant(@PathVariable("lieferantId") String lieferantId){
        if(!lieferantRepository.existsById(lieferantId)) {
            throw new BadRequestException("Lieferant existiert nicht");
        }
        lieferantRepository.deleteById(lieferantId);
        return new ResponseEntity(HttpStatus.OK);
    }
    */

    private boolean checkIfAlreadyExists(Lieferant lieferant){
        return lieferantRepository.getLieferantByValues(lieferant.getName(),
                lieferant.getAnschrift().getStrasse(),
                lieferant.getAnschrift().getNummer(),
                lieferant.getAnschrift().getOrt(),
                lieferant.getAnschrift().getPlz()) != null;
    }
}
