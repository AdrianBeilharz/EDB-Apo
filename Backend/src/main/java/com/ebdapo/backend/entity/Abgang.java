package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

/**
 * This class is for the hibernate mapping
 * it represents the tables and relations in the database
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "abgang")
public class Abgang extends BetaeubungsmittelBuchung{

    @ManyToOne(targetEntity = Arzt.class)
    @JoinColumn(name="arzt", referencedColumnName = "id")
    private Arzt arzt;

    @ManyToOne(targetEntity = Empfaenger.class)
    @JoinColumn(name="empfaenger", referencedColumnName = "id")
    private Empfaenger empfaenger;

    @Column(name="rezept", nullable = false)
    private String rezept;


}
