package com.ebdapo.backend.entity;

import com.ebdapo.backend.entity.enums.Darreichungsform;
import com.ebdapo.backend.entity.enums.Einheit;
import lombok.Data;

import javax.persistence.Id;

@Data
public class BetaeubungsmittelUpdateDetails {

    @Id
    String id;
    String name;
    Darreichungsform darreichungsform;
    Einheit einheit;
    String apotheke; //id


}
