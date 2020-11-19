package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Darreichungsform;
import com.ebdapo.backend.entity.enums.Einheit;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@JsonIgnoreProperties({"btmBuchungen"})
@Table(name = "btm")
public class Betaeubungsmittel {

    @Id
    @Column(name="id", nullable = false)
    private String id;

    @Column(name="name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name="darreichungsform", nullable = false)
    private Darreichungsform darreichungsform;

    @Enumerated(EnumType.STRING)
    @Column(name="einheit", nullable = false)
    private Einheit einheit;

    @ManyToOne(targetEntity = Apotheke.class)
    @JoinColumn(name="apotheke", referencedColumnName = "id")
    private Apotheke apotheke;

    @OneToMany(targetEntity = BetaeubungsmittelBuchung.class, mappedBy="btm")
    private List<BetaeubungsmittelBuchung> btmBuchungen;


}
