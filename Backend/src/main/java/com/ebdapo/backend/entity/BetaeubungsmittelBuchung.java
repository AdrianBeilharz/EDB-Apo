package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "btm_buchung")
public class BetaeubungsmittelBuchung {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Temporal(TemporalType.DATE)
    @Column(name="pruefdatum", nullable = false)
    private Date pruefdatum;

    @Column(name="menge", nullable = false)
    private int menge;

    @Temporal(TemporalType.DATE)
    @Column(name="datum", nullable = false)
    private Date datum;

    @ManyToOne(targetEntity = Betaeubungsmittel.class, cascade = CascadeType.ALL)
    @JoinColumn(name="btm", referencedColumnName = "id")
    private Betaeubungsmittel btm;

    @ManyToOne(targetEntity = Benutzer.class, cascade = CascadeType.ALL)
    @JoinColumn(name="benutzer", referencedColumnName = "id")
    private Benutzer benutzer;




}
