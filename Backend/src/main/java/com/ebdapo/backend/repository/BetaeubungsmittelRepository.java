package com.ebdapo.backend.repository;

import com.ebdapo.backend.entity.Apotheke;
import com.ebdapo.backend.entity.Betaeubungsmittel;
import com.ebdapo.backend.entity.enums.Darreichungsform;
import com.ebdapo.backend.entity.enums.Einheit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BetaeubungsmittelRepository extends JpaRepository<Betaeubungsmittel, String > {

    @Query(value = "SELECT * FROM btm b WHERE b.apotheke = ?1", nativeQuery = true)
    List<Betaeubungsmittel> findBtmWithApothekenId(String apothekeId);

    @Query(value = "SELECT * FROM btm WHERE name = ?1 AND darreichungsform = ?1 AND einheit = ?1 AND apotheke = ?1", nativeQuery = true)
    Betaeubungsmittel getBtmByValues(String name, Darreichungsform darreichungsform, Einheit einheit, Apotheke apotheke);
}
