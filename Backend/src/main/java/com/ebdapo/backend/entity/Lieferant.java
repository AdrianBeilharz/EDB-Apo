package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "lieferant")
public class Lieferant {

    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Column(name="name", nullable = false)
    String name;

//    @Column(name="anschrift", nullable = false)
    @ManyToOne(targetEntity = Adresse.class, cascade = CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    Adresse anschrift;

//    @Column(name="apotheke", nullable = false)
    @ManyToOne(targetEntity = Apotheke.class, cascade = CascadeType.ALL)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    Apotheke apotheke;

}
