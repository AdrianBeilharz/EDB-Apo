package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.Adresse;
import lombok.Data;

import javax.persistence.Id;

/**
 * This class represents the data that comes from or is passed to the client
 */
@Data
public class ArztAPIDetails {

    @Id
    private String id;
    private String name;
    private Adresse anschrift;
    private String apotheke; //id

}
