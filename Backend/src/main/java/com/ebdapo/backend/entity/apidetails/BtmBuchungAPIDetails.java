package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.enums.BtmBuchungTyp;
import lombok.Data;

import javax.persistence.Id;
import java.util.Date;

@Data
public class BtmBuchungAPIDetails {

    @Id
    private String id;
    private String benutzer;    //id
    private String btm;         //id
    private int menge;
    private BtmBuchungTyp typ;
    private String anforderungsschein;
    private Date pruefdatum;
    private String lieferant;   //id
    private String arzt;        //id
    private String empfaenger;  //id
    private String rezept;    //id




}
