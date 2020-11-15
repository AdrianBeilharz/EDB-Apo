package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Darreichungsform;
import com.ebdapo.backend.entity.enums.Einheit;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "btm")
public class Betaeubungsmittel {

    @Id
    @Column(name="id", nullable = false)
    private int id;

    @Column(name="name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name="darreichungsform", nullable = false)
    private Darreichungsform darreichungsform;

    @Enumerated(EnumType.STRING)
    @Column(name="einheit", nullable = false)
    private Einheit einheit;

//    @Column(name="apotheke", nullable = false)
    @ManyToOne(targetEntity = Apotheke.class, cascade = CascadeType.ALL)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;



}
