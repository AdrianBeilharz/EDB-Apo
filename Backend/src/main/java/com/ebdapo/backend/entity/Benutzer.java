package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Rolle;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"btmBuchungen", "apotheke", "passwort"})
@Table(name = "benutzer")
public class Benutzer {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="nutzername", nullable = false)
    private String nutzername;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="vorname", nullable = false)
    private String vorname;

    @Column(name="passwort", nullable = false)
    private String passwort;

    @Column(name="aktiv", nullable = false)
    private boolean aktiv;

    @Enumerated(EnumType.STRING)
    @Column(name="rolle", nullable = false)
    private Rolle rolle;

    @ManyToOne(targetEntity = Apotheke.class)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

    @OneToMany(targetEntity = BetaeubungsmittelBuchung.class, cascade = CascadeType.ALL, mappedBy="benutzer")
    private List<BetaeubungsmittelBuchung> btmBuchungen;

}
