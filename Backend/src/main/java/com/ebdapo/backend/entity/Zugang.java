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
@Table(name = "zugang")
public class Zugang extends BetaeubungsmittelBuchung{

    @Column(name="anfordergungsschein", nullable = false)
    private String anfordergungsschein;

    @ManyToOne(targetEntity = Lieferant.class)
    @JoinColumn(name="lieferant", referencedColumnName = "id")
    private Lieferant lieferant;


}
