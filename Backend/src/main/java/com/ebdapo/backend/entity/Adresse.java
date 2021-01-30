package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * This class is for the hibernate mapping
 * it represents the tables and relations in the database
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "adresse_t")
public class Adresse {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="strasse", nullable = false)
    private String strasse;

    @Column(name="nummer", nullable = false)
    private String nummer;

    @Column(name="ort", nullable = false)
    private String ort;

    @Column(name="plz", nullable = false)
    private int plz;


}
