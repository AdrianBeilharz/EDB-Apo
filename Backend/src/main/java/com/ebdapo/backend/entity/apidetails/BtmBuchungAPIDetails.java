package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.enums.BtmBuchungTyp;
import lombok.Data;

import javax.persistence.Id;
import java.util.Date;

/**
 * This class represents the data that comes from or is passed to the client
 */
@Data
public class BtmBuchungAPIDetails {

    private String benutzer;    //id
    private String btm;         //id
    private int menge;
    private Date datum;
    private BtmBuchungTyp typ;
    private String anforderungsschein;
    private Date pruefdatum;
    private String lieferant;   //id
    private String arzt;        //id
    private String empfaenger;  //id
    private String rezept;    //id
    private String pruefer; //id




}
