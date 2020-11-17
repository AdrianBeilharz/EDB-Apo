package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@Table(name = "zugang")
public class Zugang implements Serializable {

    @Id
    @OneToOne(targetEntity = BetaeubungsmittelBuchung.class, cascade = CascadeType.ALL)
    @JoinColumn(name="btm_buchung", referencedColumnName = "id")
    private BetaeubungsmittelBuchung btmBuchung;

    @Column(name="anfordergungsschein", nullable = false)
    private String anfordergungsschein;

    @Id
    @ManyToOne(targetEntity = Lieferant.class, cascade = CascadeType.ALL)
    @JoinColumn(name="lieferant", referencedColumnName = "id")
    private Lieferant lieferant;


}
