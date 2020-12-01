package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.Arzt;
import com.ebdapo.backend.entity.Lieferant;
import com.ebdapo.backend.entity.apidetails.ArztAPIDetails;
import com.ebdapo.backend.repository.ApothekenRepository;
import com.ebdapo.backend.repository.ArztRepository;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ArztController {

    @Autowired
    ArztRepository arztRepo;

    @Autowired
    ApothekenRepository apothekenRepo;

    @GetMapping("/apotheke/{apothekeId}/arzt")
    public List<Arzt> getAllAerzte(@PathVariable String apothekeId) {
        return apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new).getAerzte();
    }

    @PostMapping("/apotheke/{apothekeId}/arzt")
    public ResponseEntity<Arzt> addArzt(@PathVariable String apothekeId, @RequestBody ArztAPIDetails arzt) {

        Arzt newArzt = arztRepo.findArztByValues(apothekeId,
                arzt.getName(),
                arzt.getAnschrift().getStrasse(),
                arzt.getAnschrift().getNummer(),
                arzt.getAnschrift().getPlz(),
                arzt.getAnschrift().getOrt());


        if(newArzt == null) {
            newArzt = new Arzt();
            newArzt.setId(UUID.randomUUID().toString());
            newArzt.setApotheke(apothekenRepo.findById(apothekeId).orElseThrow(InvalidInputException::new));
            newArzt.setAnschrift(arzt.getAnschrift());
            newArzt.getAnschrift().setId(UUID.randomUUID().toString());
            newArzt.setName(arzt.getName());
            arztRepo.save(newArzt);
            return new ResponseEntity<>(newArzt, HttpStatus.CREATED);
        }else {
            throw new InvalidInputException("Arzt existiert bereits");
        }
    }

    @GetMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity<Arzt> getArzt(@PathVariable String apothekeId, @PathVariable String arztId) {
        Arzt l =  arztRepo.findByIds(arztId, apothekeId);
        if(l == null){
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }
        return  new ResponseEntity<>(l, HttpStatus.OK);
    }

    @PutMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity<Arzt> updateArzt(@PathVariable String apothekeId, @PathVariable String arztId, @RequestBody ArztAPIDetails arzt){
        Arzt found = arztRepo.findByIds(arztId, apothekeId);

        if(found == null) {
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }

        if(arzt.getApotheke() == null || arzt.getApotheke().isEmpty()){
            throw new InvalidInputException("ApothekenId darf nicht leer sein");
        }
        found.setName(arzt.getName());

        found.getAnschrift().setPlz(arzt.getAnschrift().getPlz());
        found.getAnschrift().setOrt(arzt.getAnschrift().getOrt());
        found.getAnschrift().setStrasse(arzt.getAnschrift().getStrasse());
        found.getAnschrift().setNummer(arzt.getAnschrift().getNummer());

        found.setApotheke(apothekenRepo.findById(arzt.getApotheke()).orElseThrow(InvalidInputException::new));
        arztRepo.save(found);
        return new ResponseEntity<>(found, HttpStatus.OK);
    }

    @DeleteMapping("/apotheke/{apothekeId}/arzt/{arztId}")
    public ResponseEntity deleteApotheke(@PathVariable String apothekeId, @PathVariable String arztId){
        Arzt found = arztRepo.findByIds(arztId, apothekeId);
        if(found == null) {
            throw new InvalidInputException("Arzt konnte nicht gefunden werden");
        }

        arztRepo.delete(found);
        return new ResponseEntity(HttpStatus.OK);
    }


}
