package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(name = "abgang")
public class Abgang implements Serializable {

    @Id
    @OneToOne(targetEntity = BetaeubungsmittelBuchung.class, cascade = CascadeType.ALL)
    @JoinColumn(name="btm_buchung", referencedColumnName = "id")
    private BetaeubungsmittelBuchung btmBuchung;

    @ManyToOne(targetEntity = Arzt.class, cascade = CascadeType.ALL)
    @JoinColumn(name="arzt", referencedColumnName = "id")
    private Arzt arzt;

    @ManyToOne(targetEntity = Empfaenger.class, cascade = CascadeType.ALL)
    @JoinColumn(name="empfaenger", referencedColumnName = "id")
    private Empfaenger empfaenger;

    @Column(name="rezept", nullable = false)
    private String rezept;


}
