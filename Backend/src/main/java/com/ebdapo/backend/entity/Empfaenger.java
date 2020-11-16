package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "empfaenger")
public class Empfaenger {

    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Column(name="name", nullable = false)
    private String name;

//    @Column(name="anschrift", nullable = false)
    @OneToOne(targetEntity = Adresse.class, cascade = CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    private Adresse anschrift;

//    @Column(name="apotheke", nullable = false)
    @ManyToOne(targetEntity = Apotheke.class, cascade = CascadeType.ALL)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

}
