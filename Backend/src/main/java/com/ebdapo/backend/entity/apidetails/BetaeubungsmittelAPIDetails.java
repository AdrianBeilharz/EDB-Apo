package com.ebdapo.backend.entity.apidetails;

import com.ebdapo.backend.entity.enums.Darreichungsform;
import com.ebdapo.backend.entity.enums.Einheit;
import lombok.Data;

import javax.persistence.Id;

@Data
public class BetaeubungsmittelAPIDetails {

    @Id
    private String id;
    private String name;
    private Darreichungsform darreichungsform;
    private Einheit einheit;
    private String apotheke; //id


}
