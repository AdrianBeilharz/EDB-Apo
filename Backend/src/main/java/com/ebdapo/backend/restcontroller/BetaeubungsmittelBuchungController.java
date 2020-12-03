package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.*;
import com.ebdapo.backend.entity.apidetails.BtmBuchungAPIDetails;
import com.ebdapo.backend.entity.enums.BtmBuchungTyp;
import com.ebdapo.backend.entity.enums.Rolle;
import com.ebdapo.backend.repository.*;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
public class BetaeubungsmittelBuchungController {

    @Autowired private BetaeubungsmittelBuchungRepository btmBuchungRepo;
    @Autowired private ApothekenRepository apoRepo;
    @Autowired private EmpfaengerRepository empfRepository;
    @Autowired private ArztRepository arztRepository;
    @Autowired private LieferantRepository lieferantRepo;
    @Autowired private ZugangRepository zugangRepository;
    @Autowired private AbgangRepository abgangRepository;
    @Autowired private BenutzerRepository benutzerRepository;
    @Autowired private BetaeubungsmittelRepository btmRepo;
    @Autowired private AuthenticationController authController;

    @GetMapping("/apotheke/{apothekeId}/btmbuchung")
    public ResponseEntity<?> getAllBtm(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!apoRepo.existsById(apothekeId)){
            throw new BadRequestException("Apotheke existiert nicht");
        }
        return new ResponseEntity<>(btmBuchungRepo.findBtmBuchungWithApothekenId(apothekeId), HttpStatus.OK);
    }

    @PostMapping("/apotheke/{apothekeId}/btmbuchung")
    public ResponseEntity<?> createNewBtm(@PathVariable String apothekeId, @RequestBody BtmBuchungAPIDetails btDetails) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

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
    public ResponseEntity<?> getBtmById(@PathVariable String apothekeId, @PathVariable String btmbuchungId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!btmBuchungRepo.existsById(btmbuchungId)){
            throw new InvalidInputException("Falsche ID");
        }
        return new ResponseEntity<>(btmBuchungRepo.findById(btmbuchungId).orElseThrow(InvalidInputException::new), HttpStatus.OK);
    }

    @PutMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity<BetaeubungsmittelBuchung> updateBtmById(@PathVariable String apothekeId, @PathVariable String btmbuchungId, @RequestBody BtmBuchungAPIDetails newBtmBuchung) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        //Wird verwendet da ein Pruefer nur das Pruefdatum eines BTM aendern kann und nicht andere properties
        boolean pruefer = false;
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_"+Rolle.PRUEFER.toString())) {
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
    public ResponseEntity<?> deleteBtm(@PathVariable String btmbuchungId){
        if(!btmBuchungRepo.existsById(btmbuchungId)) {
            throw new BadRequestException();
        }
        btmBuchungRepo.deleteById(btmbuchungId);
        abgangRepository.deleteById(btmbuchungId);
        zugangRepository.deleteById(btmbuchungId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean checkIfAlreadyExists(BtmBuchungAPIDetails btmBuchung) {
        return btmBuchungRepo.getBtmBuchungByValues(btmBuchung.getPruefdatum(),
                btmBuchung.getMenge(),
                btmBuchung.getBtm(),
                btmBuchung.getBenutzer()) != null;
    }


}
