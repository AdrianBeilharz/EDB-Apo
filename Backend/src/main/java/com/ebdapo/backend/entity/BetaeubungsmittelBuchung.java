package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

/**
 * This class is for the hibernate mapping
 * it represents the tables and relations in the database
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "btm_buchung")
@Inheritance(strategy = InheritanceType.JOINED)
public class BetaeubungsmittelBuchung {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Temporal(TemporalType.DATE)
    @Column(name="pruefdatum")
    private Date pruefdatum;

    @Column(name="menge", nullable = false)
    private int menge;

    @Temporal(TemporalType.DATE)
    // @DateTimeFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    @Column(name="datum", nullable = false)
    private Date datum;

    @ManyToOne(targetEntity = Betaeubungsmittel.class)
    @JoinColumn(name="btm", referencedColumnName = "id")
    private Betaeubungsmittel btm;

    @ManyToOne(targetEntity = Benutzer.class)
    @JoinColumn(name="benutzer", referencedColumnName = "id")
    private Benutzer benutzer;

    @ManyToOne(targetEntity = Benutzer.class)
    @JoinColumn(name="pruefer", referencedColumnName = "id")
    private Benutzer pruefer;


}
