package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.Adresse;
import lombok.Data;

import javax.persistence.Id;

@Data
public class ArztAPIDetails {

    @Id
    private String id;
    private String name;
    private Adresse anschrift;
    private String apotheke; //id

}
