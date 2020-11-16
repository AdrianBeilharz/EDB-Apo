package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Rolle;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "benutzer")
public class Benutzer {

    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="vorname", nullable = false)
    private String vorname;

    @Column(name="passwort", nullable = false)
    private String passwort;

    @Enumerated(EnumType.STRING)
    @Column(name="rolle", nullable = false)
    private Rolle rolle;

//    @Column(name="apotheke", nullable = false)
    @ManyToOne(targetEntity = Apotheke.class, cascade = CascadeType.ALL)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

}
