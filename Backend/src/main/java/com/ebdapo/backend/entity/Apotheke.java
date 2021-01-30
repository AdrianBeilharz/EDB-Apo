package com.ebdapo.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * This class is for the hibernate mapping
 * it represents the tables and relations in the database
 */
@Entity
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"benutzer", "aerzte", "lieferanten", "empfaenger", "betaeubungsmittel"})
@Table(name = "apotheke")
public class Apotheke {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="name", nullable = false)
    private String name;

    @OneToOne(targetEntity = Adresse.class, cascade=CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    private Adresse anschrift;

    @OneToMany(targetEntity = Benutzer.class, cascade = CascadeType.ALL, mappedBy="apotheke")
    private List<Benutzer> benutzer;

    @OneToMany(targetEntity = Arzt.class, cascade = CascadeType.ALL, mappedBy="apotheke")
    private List<Arzt> aerzte;

    @OneToMany(targetEntity = Lieferant.class, cascade = CascadeType.ALL, mappedBy="apotheke")
    private List<Lieferant> lieferanten;

    @OneToMany(targetEntity = Empfaenger.class, cascade = CascadeType.ALL, mappedBy="apotheke")
    private List<Empfaenger> empfaenger;

    @OneToMany(targetEntity = Betaeubungsmittel.class, cascade = CascadeType.ALL, mappedBy ="apotheke")
    private List<Betaeubungsmittel> betaeubungsmittel;

}
