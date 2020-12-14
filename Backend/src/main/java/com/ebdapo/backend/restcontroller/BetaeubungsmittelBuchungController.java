package com.ebdapo.backend.restcontroller;

import com.ebdapo.backend.entity.*;
import com.ebdapo.backend.entity.apidetails.BtmBuchungAPIDetails;
import com.ebdapo.backend.entity.enums.BtmBuchungTyp;
import com.ebdapo.backend.entity.enums.Rolle;
import com.ebdapo.backend.repository.*;
import com.ebdapo.backend.restcontroller.response.BadRequestException;
import com.ebdapo.backend.restcontroller.response.InvalidInputException;
import com.ebdapo.backend.security.auth.AuthenticationController;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

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

    @Data
    private class BtmBuchungsResponse {
        Betaeubungsmittel btm;
        List<BtmBuchung> buchungen;
    }

    @Data
    private class BtmBuchung {
        private String id;
        private Date datum;
        private Date pruefdatum;
        private int menge;
        private String TYP; //ZUGANG ODER ABGANG

        public BtmBuchung() {}

        public BtmBuchung(String id, Date datum, Date pruefdatum, int menge, String TYP) {
            this.id = id;
            this.datum = datum;
            this.pruefdatum = pruefdatum;
            this.menge = menge;
            this.TYP = TYP;
        }
    }

    @Data
    private class BtmBuchungZugang extends BtmBuchung {
        private String anforderungsschein;
        private Lieferant lieferant;

        public BtmBuchungZugang(String id, Date datum , Date pruefdatum, int menge, String TYP, String anforderungsschein, Lieferant lieferant) {
            super(id, datum, pruefdatum, menge, TYP);
            this.anforderungsschein = anforderungsschein;
            this.lieferant = lieferant;
        }
    }

    @Data
    private class BtmBuchungAbgang extends BtmBuchung {
        private Empfaenger empfaenger;
        private Arzt arzt;
        private String rezept;

        public BtmBuchungAbgang(String id, Date datum, Date pruefdatum, int menge, String TYP, Empfaenger empfaenger, Arzt arzt, String rezept) {
            super(id, datum, pruefdatum, menge, TYP);
            this.empfaenger = empfaenger;
            this.arzt = arzt;
            this.rezept = rezept;
        }
    }


    @GetMapping("/apotheke/{apothekeId}/btmbuchung")
    public ResponseEntity<?> getAllBtm(@PathVariable String apothekeId) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!apoRepo.existsById(apothekeId)){
            throw new BadRequestException("Apotheke existiert nicht");
        }

        List<Betaeubungsmittel> btms = btmRepo.getByApotheke(apothekeId);

        List<BtmBuchungsResponse> response = new ArrayList<>();
        for(Betaeubungsmittel b: btms) {
            BtmBuchungsResponse bResponse = new BtmBuchungsResponse();
            bResponse.setBtm(b);

            List<BtmBuchungZugang> zugaenge = zugangRepository.getBtmBuchungZugaenge(apothekeId, b.getId())
                    .stream()
                    .map(e -> new BtmBuchungZugang(e.getId(), e.getDatum(), e.getPruefdatum(), e.getMenge(), "ZUGANG", e.getAnfordergungsschein(), e.getLieferant()))
                    .collect(Collectors.toList());

            List<BtmBuchungAbgang> abgaenge = abgangRepository.getBtmBuchungAbgaenge(apothekeId, b.getId())
                    .stream()
                    .map(e -> new BtmBuchungAbgang(e.getId(), e.getDatum(), e.getPruefdatum(), e.getMenge(), "ABGANG", e.getEmpfaenger(), e.getArzt(), e.getRezept()))
                    .collect(Collectors.toList());

            List<BtmBuchung> buchungen = new ArrayList<>();
            buchungen.addAll(zugaenge);
            buchungen.addAll(abgaenge);

            List<BtmBuchung> sortedBuchungen = buchungen.stream().sorted(Collections.reverseOrder(Comparator.comparing(BtmBuchung::getDatum))).collect(Collectors.toList());
            bResponse.setBuchungen(sortedBuchungen);
            response.add(bResponse);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
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
            btm.setMenge(btm.getMenge()+zugang.getMenge());
            zugang.setBtm(btm);

            Benutzer benutzer = benutzerRepository.findById(btDetails.getBenutzer()).orElseThrow(InvalidInputException::new);
            zugang.setBenutzer(benutzer);

            //specific
            Lieferant lieferant = lieferantRepo.findById(btDetails.getLieferant()).orElseThrow(InvalidInputException::new);
            zugang.setLieferant(lieferant);
            zugang.setAnfordergungsschein(btDetails.getAnforderungsschein());


            btmRepo.save(btm);
            zugangRepository.save(zugang);
            return new ResponseEntity<>(zugang, HttpStatus.CREATED);

        }else if(btDetails.getTyp() == BtmBuchungTyp.ABGANG) {
            Abgang abgang = new Abgang();

            abgang.setId(UUID.randomUUID().toString());
            abgang.setMenge(btDetails.getMenge());
            abgang.setDatum(new Date());
            abgang.setPruefdatum(btDetails.getPruefdatum());

            Betaeubungsmittel btm = btmRepo.findById(btDetails.getBtm()).orElseThrow(InvalidInputException::new);
            btm.setMenge(btm.getMenge()-abgang.getMenge());
            abgang.setBtm(btm);

            Benutzer benutzer = benutzerRepository.findById(btDetails.getBenutzer()).orElseThrow(InvalidInputException::new);
            abgang.setBenutzer(benutzer);

            //specific
            Empfaenger empf = empfRepository.findById(btDetails.getEmpfaenger()).orElseThrow(InvalidInputException::new);
            abgang.setEmpfaenger(empf);
            Arzt arzt = arztRepository.findById(btDetails.getArzt()).orElseThrow(InvalidInputException::new);
            abgang.setArzt(arzt);
            abgang.setRezept(btDetails.getRezept());

            btmRepo.save(btm);
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
    public ResponseEntity<?> updateBtmById(@PathVariable String apothekeId, @PathVariable String btmbuchungId, @RequestBody BtmBuchungAPIDetails newBtmBuchung) {
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        //Wird verwendet da ein Pruefer nur das Pruefdatum eines BTM aendern kann und nicht andere properties
        boolean pruefer = false;
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString().contains("ROLE_"+Rolle.PRUEFER.toString())) {
            pruefer = true;
        }

        Zugang z = zugangRepository.findByIds(btmbuchungId, apothekeId);
        if(z != null){
            Betaeubungsmittel btm = z.getBtm();
            int previousMenge = z.getMenge();
            if(!pruefer){
                //Wenn eine Buchung aktualisiert wird, muss die vorherige Mengenberechnung
                //rückgängig gemacht werden
                btm.setMenge(btm.getMenge()-previousMenge+newBtmBuchung.getMenge());
                z.setBenutzer(benutzerRepository.findById(newBtmBuchung.getBenutzer()).orElseThrow(InvalidInputException::new));
                z.setBtm(btmRepo.findById(newBtmBuchung.getBtm()).orElseThrow(InvalidInputException::new));
                z.setMenge(newBtmBuchung.getMenge());
                z.setAnfordergungsschein(newBtmBuchung.getAnforderungsschein());
                z.setLieferant(lieferantRepo.findById(newBtmBuchung.getLieferant()).orElseThrow(InvalidInputException::new));
            }
            z.setPruefdatum(newBtmBuchung.getPruefdatum());
            btmRepo.save(btm);
            zugangRepository.save(z);
            return new ResponseEntity<>(z, HttpStatus.OK);
        }

        Abgang a = abgangRepository.findByIds(btmbuchungId, apothekeId);
        if(a != null){
            Betaeubungsmittel btm = a.getBtm();
            int previousMenge = a.getMenge();
            if(!pruefer){
                btm.setMenge(btm.getMenge()+previousMenge-newBtmBuchung.getMenge());
                a.setBenutzer(benutzerRepository.findById(newBtmBuchung.getBenutzer()).orElseThrow(InvalidInputException::new));
                a.setBtm(btmRepo.findById(newBtmBuchung.getBtm()).orElseThrow(InvalidInputException::new));
                a.setMenge(newBtmBuchung.getMenge());
                a.setEmpfaenger(empfRepository.findById(newBtmBuchung.getEmpfaenger()).orElseThrow(InvalidInputException::new));
                a.setRezept(newBtmBuchung.getRezept());
                a.setArzt(arztRepository.findById(newBtmBuchung.getArzt()).orElseThrow(InvalidInputException::new));
            }
            a.setPruefdatum(newBtmBuchung.getPruefdatum());
            btmRepo.save(btm);
            abgangRepository.save(a);
            return new ResponseEntity<>(a, HttpStatus.OK);
        }else {
            throw new InvalidInputException();
        }
    }

    @DeleteMapping("/apotheke/{apothekeId}/btmbuchung/{btmbuchungId}")
    public ResponseEntity<?> deleteBtm(@PathVariable String apothekeId, @PathVariable String btmbuchungId){
        if(!authController.checkIfAuthorized(authController.getCurrentUsername(), apothekeId)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if(!btmBuchungRepo.existsById(btmbuchungId)) {
            throw new BadRequestException();
        }
        Abgang a = abgangRepository.findByIds(btmbuchungId,apothekeId);
        if(a != null){
            abgangRepository.delete(a);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Zugang z = zugangRepository.findByIds(btmbuchungId, apothekeId);
        if(z != null){
            zugangRepository.delete(z);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private boolean checkIfAlreadyExists(BtmBuchungAPIDetails btmBuchung) {
        return btmBuchungRepo.getBtmBuchungByValues(btmBuchung.getPruefdatum(),
                btmBuchung.getMenge(),
                btmBuchung.getBtm(),
                btmBuchung.getBenutzer()) != null;
    }


}
