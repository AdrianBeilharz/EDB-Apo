package com.ebdapo.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "apotheke")
public class Apotheke {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="name", nullable = false)
    private String name;

//    @Column(name="anschrift", nullable = false)
    @OneToOne(targetEntity = Adresse.class, cascade = CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    private Adresse anschrift;

    @OneToMany(targetEntity = Benutzer.class, cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private List<Benutzer> benutzer;


}
