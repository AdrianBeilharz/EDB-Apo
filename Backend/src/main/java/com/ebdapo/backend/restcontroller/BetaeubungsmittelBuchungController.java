package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.*;
import com.ebdapo.backend.entity.apidetails.BtmBuchungAPIDetails;
import com.ebdapo.backend.entity.enums.BtmBuchungTyp;
import com.ebdapo.backend.entity.enums.Rolle;
import com.ebdapo.backend.repository.*;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
public class BetaeubungsmittelBuchungController {

    @Autowired BetaeubungsmittelBuchungRepository btmBuchungRepo;
    @Autowired ApothekenRepository apoRepo;
    @Autowired EmpfaengerRepository empfRepository;
    @Autowired ArztRepository arztRepository;
    @Autowired LieferantRepository lieferantRepo;
    @Autowired ZugangRepository zugangRepository;
    @Autowired AbgangRepository abgangRepository;
    @Autowired BenutzerRepository benutzerRepository;
    @Autowired BetaeubungsmittelRepository btmRepo;


    @GetMapping("/apotheke/{apothekeId}/btmbuchung")
    public List<BetaeubungsmittelBuchung> getAllBtm(@PathVariable String apothekeId) {
        if(!apoRepo.existsById(apothekeId)){
            throw new BadRequestException("Apotheke existiert nicht");
        }
        return btmBuchungRepo.findBtmBuchungWithApothekenId(apothekeId);
    }

    @PostMapping("/apotheke/{apothekeId}/btmbuchung")
    public ResponseEntity<BetaeubungsmittelBuchung> createNewBtm(@RequestBody BtmBuchungAPIDetails btDetails) {
        if(checkIfAlreadyExists(btDetails)){
            throw new InvalidInputException("Betaeubungsmittel-Buchung existiert bereits");
        }


        if(btDetails.getTyp() == BtmBuchungTyp.ZUGANG) {
            Zugang zugang = new Zugang();
            zugang.setId(UUID.randomUUID().toString());
            zugang.setMenge(btDetails.getMenge());
            zugang.setDatum(new Date());
            zugang.setPruefdatum(btDetails.getPruefdatum());

            Betaeubungsmittel btm = btmRepo.findById(btDetails.getBtm()).orElseThrow(InvalidInputException::new);
            zugang.setBtm(btm);

            Benutzer benutzer = benutzerRepository.findById(btDetails.getBenutzer()).orElseThrow(InvalidInputException::new);
            zugang.setBenutzer(benutzer);

            //specific
            Lieferant lieferant = lieferantRepo.findById(btDetails.getLieferant()).orElseThrow(InvalidInputException::new);
            zugang.setLieferant(lieferant);
            zugang.setAnfordergungsschein(btDetails.getAnforderungsschein());
            zugangRepository.save(zugang);
            return new ResponseEntity<>(zugang, HttpStatus.CREATED);

        }else if(btDetails.getTyp() == BtmBuchungTyp.ABGANG) {
            Abgang abgang = new Abgang();

            abgang.setId(UUID.randomUUID().toString());
            abgang.setMenge(btDetails.getMenge());
            abgang.setDatum(new Date());
            abgang.setPruefdatum(btDetails.getPruefdatum());

            Betaeubungsmittel btm = btmRepo.findById(btDetails.getBtm()).orElseThrow(InvalidInputException::new);
            abgang.setBtm(btm);

            Benutzer benutzer = benutzerRepository.findById(btDetails.getBenutzer()).orElseThrow(InvalidInputException::new);
            abgang.setBenutzer(benutzer);

            //specific
            Empfaenger empf = empfRepository.findById(btDetails.getEmpfaenger()).orElseThrow(InvalidInputException::new);
            abgang.setEmpfaenger(empf);
            Arzt arzt = arztRepository.findById(btDetails.getArzt()).orElseThrow(InvalidInputException::new);
            abgang.setArzt(arzt);
            abgang.setRezept(btDetails.getRezept());
            abgangRepository.save(abgang);
            return new ResponseEntity<>(abgang, HttpStatus.CREATED);
        }else {
            throw new InvalidInputException("Betaebungsmittel muss einen Typ haben (Zugang oder Abgang)");
        }
    }

    @GetMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public BetaeubungsmittelBuchung getBtmById(@PathVariable String btmbuchungId) {
        if(!btmBuchungRepo.existsById(btmbuchungId)){
            throw new InvalidInputException("Falsche ID");
        }
        return btmBuchungRepo.findById(btmbuchungId).orElseThrow(InvalidInputException::new);
    }

    @PutMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity<BetaeubungsmittelBuchung> updateBtmById(@PathVariable String apothekeId, @PathVariable String btmbuchungId, @RequestBody BtmBuchungAPIDetails newBtmBuchung) {
        SecurityContextHolder.getContext().getAuthentication().getAuthorities().forEach(System.out::println);
        boolean pruefer = false;
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains("ROLE_"+Rolle.PRUEFER.toString())) {
            pruefer = true;
        }

        Zugang z = zugangRepository.findByIds(btmbuchungId, apothekeId);
        Abgang a = abgangRepository.findByIds(btmbuchungId, apothekeId);

        if(z != null){
            if(!pruefer){
                z.setBenutzer(benutzerRepository.findById(newBtmBuchung.getBenutzer()).orElseThrow(InvalidInputException::new));
                z.setBtm(btmRepo.findById(newBtmBuchung.getBtm()).orElseThrow(InvalidInputException::new));
                z.setMenge(newBtmBuchung.getMenge());
                z.setAnfordergungsschein(newBtmBuchung.getAnforderungsschein());
                z.setLieferant(lieferantRepo.findById(newBtmBuchung.getLieferant()).orElseThrow(InvalidInputException::new));
            }
            z.setPruefdatum(newBtmBuchung.getPruefdatum());
            zugangRepository.save(z);
            return new ResponseEntity<>(z, HttpStatus.OK);
        }else if(a != null){
            if(!pruefer){
                a.setBenutzer(benutzerRepository.findById(newBtmBuchung.getBenutzer()).orElseThrow(InvalidInputException::new));
                a.setBtm(btmRepo.findById(newBtmBuchung.getBtm()).orElseThrow(InvalidInputException::new));
                a.setMenge(newBtmBuchung.getMenge());
                a.setEmpfaenger(empfRepository.findById(newBtmBuchung.getEmpfaenger()).orElseThrow(InvalidInputException::new));
                a.setRezept(newBtmBuchung.getRezept());
                a.setArzt(arztRepository.findById(newBtmBuchung.getArzt()).orElseThrow(InvalidInputException::new));
            }
            a.setPruefdatum(newBtmBuchung.getPruefdatum());
            abgangRepository.save(a);
            return new ResponseEntity<>(a, HttpStatus.OK);
        }else {
            throw new InvalidInputException();
        }
    }

    @DeleteMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity deleteBtm(@PathVariable String btmbuchungId){
        if(!btmBuchungRepo.existsById(btmbuchungId)) {
            throw new BadRequestException();
        }
        btmBuchungRepo.deleteById(btmbuchungId);
        abgangRepository.deleteById(btmbuchungId);
        zugangRepository.deleteById(btmbuchungId);
        return new ResponseEntity(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(BtmBuchungAPIDetails btmBuchung) {
        return btmBuchungRepo.getBtmBuchungByValues(btmBuchung.getPruefdatum(),
                btmBuchung.getMenge(),
                btmBuchung.getBtm(),
                btmBuchung.getBenutzer()) != null;
    }

}
