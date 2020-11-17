package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Lieferant;
import com.ebdapo.backend.repository.LieferantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
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

        String id = UUID.randomUUID().toString();
        lieferant.setId(id);

        lieferantRepository.save(lieferant);
        return new ResponseEntity<Lieferant>(lieferant, HttpStatus.OK);
    }

    @GetMapping("/lieferant/{lieferantId}")
    public Lieferant getLieferant(@PathVariable("lieferantId") String lieferantId) {
        return lieferantRepository.findById(lieferantId)
                .orElseThrow(() -> new EntityNotFoundException(lieferantId));
    }

    @PutMapping("/lieferant/{lieferantId}")
    public Lieferant updateLieferant(@PathVariable String lieferantId, @RequestBody Lieferant lieferant){
            Lieferant dbLieferant = lieferantRepository.findById(lieferantId)
                    .orElseThrow(() -> new EntityNotFoundException(lieferantId));
        dbLieferant.setName(lieferant.getName());
        dbLieferant.setAnschrift(lieferant.getAnschrift());
        dbLieferant.setApotheke(lieferant.getApotheke());
        return lieferantRepository.save(dbLieferant);
    }

}
