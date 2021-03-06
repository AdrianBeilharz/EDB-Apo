package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.enums.Rolle;
import lombok.Data;

import javax.persistence.Id;

/**
 * This class represents the data that comes from or is passed to the client
 */
@Data
public class BenutzerAPIDetails {

    @Id
    private String id;
    private String nutzername;
    private String vorname;
    private String name;
//    private String passwort;
    private boolean aktiv;
    private Rolle rolle;
    private String apotheke; //id
    private String oldPassword;
    private String newPassword;
    private String passwort;

}
