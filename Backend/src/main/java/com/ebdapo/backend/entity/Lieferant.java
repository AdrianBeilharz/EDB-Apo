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
    private String id;

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

    public void setName(String name) {
        this.name = name;
    }

    public void setAnschrift(Adresse anschrift) {
        this.anschrift = anschrift;
    }

    public void setApotheke(Apotheke apotheke) {
        this.apotheke = apotheke;
    }

    public String getName() {
        return name;
    }

    public Adresse getAnschrift() {
        return anschrift;
    }

    public Apotheke getApotheke() {
        return apotheke;
    }

    public void setId(String id) {
        this.id = id;
    }
}
