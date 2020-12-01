package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.Adresse;
import lombok.Data;

import javax.persistence.Id;

@Data
public class EmpfaengerAPIDetails {

    @Id String id;
    String name;
    String vorname;
    Adresse anschrift;
    String apotheke; //id
}
