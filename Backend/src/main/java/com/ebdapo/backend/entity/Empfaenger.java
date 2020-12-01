package com.ebdapo.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"abgaenge"})
@Table(name = "empfaenger")
public class Empfaenger {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="vorname", nullable = false)
    private String vorname;

    @OneToOne(targetEntity = Adresse.class, cascade = CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    private Adresse anschrift;

    @ManyToOne(targetEntity = Apotheke.class)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

    @OneToMany(targetEntity = Abgang.class, cascade = CascadeType.ALL, mappedBy="empfaenger")
    private List<Abgang> abgaenge;

}
