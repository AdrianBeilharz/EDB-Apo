package com.ebdapo.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"zugaenge"})
@Table(name = "lieferant")
public class Lieferant {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="name", nullable = false)
    private String name;

    @ManyToOne(targetEntity = Adresse.class, cascade = CascadeType.ALL)
    @JoinColumn(name="anschrift", referencedColumnName = "id")
    private Adresse anschrift;

    @ManyToOne(targetEntity = Apotheke.class, cascade = CascadeType.ALL)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

    @OneToMany(targetEntity = Zugang.class, cascade = CascadeType.ALL, mappedBy="lieferant")
    private List<Zugang> zugaenge;

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
