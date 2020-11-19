package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Rolle;
import lombok.Data;

import javax.persistence.Id;

@Data
public class BenutzerUpdateDetails {

    @Id
    private String id;
    private String nutzername;
    private String vorname;
    private String name;
    private String passwort;
    private Rolle rolle;
    private String apotheke; //id

}
